import { NextFunction, Request, Response } from 'express';
import transformCountry from '../converters/transform-country';
import { NotFoundError } from '../errors/not-found-error';
import { BASE_URL } from '../constants/urls';
import getNeighbors from '../services/get-neighbors';
import transformAllCountries from '../converters/transform-all-countries';
import { cacheResponse } from '../redis/redis-utils';
import { CacheError } from '../errors/cache-error';

export const getAllCountries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = await fetch(
    BASE_URL + 'all?fields=name,capital,flags,population,region'
  );
  const data = await response.json();
  const countries = transformAllCountries(data);

  try {
    await cacheResponse(res, countries);
  } catch {
    next(new CacheError('Cannot save countries cache'));
  }
  res.send(countries);
};

export const getCountryByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const name = req.params.name;
  const response = await fetch(`${BASE_URL}name/${name}`);
  const data = await response.json();
  const country = data[0];

  if (!country) return next(new NotFoundError('Country Not Found'));

  const codes = country.borders?.join(',');
  let neighbors = [] as any[];

  if (codes) {
    neighbors = await getNeighbors(codes);
  }

  const preparedCountry = transformCountry(country) as any;
  preparedCountry.neighbors = neighbors;

  try {
    await cacheResponse(res, preparedCountry);
  } catch {
    next(new CacheError('Cannot save country cache'));
  }
  res.send(preparedCountry);
};
