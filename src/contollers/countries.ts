import {NextFunction, Request, Response} from 'express';
import transformCountry from "../converters/transform-country";
import {NotFoundError} from "../errors/not-found-error";
import {BASE_URL} from "../constants/urls";
import getNeighbors from "../services/get-neighbors";
import transformAllCountries from "../converters/transform-all-countries";
import {cacheResponse} from "../redis/redis-utils";

export const getAllCountries = async (req: Request, res: Response) => {
    const response = await fetch(BASE_URL + 'all?fields=name,capital,flags,population,region');

    const data = await response.json();

    const countries = transformAllCountries(data)

    await cacheResponse(res, countries)
    res.status(200).json(countries);
};

export const getCountryByName = async (req: Request, res: Response, next: NextFunction) => {

    const name = req.params.name

    const response = await fetch(BASE_URL + 'name/' + name);

    const data = await response.json();

    const country = data[0];

    if (!country) return next(new NotFoundError('Country not found'));

    const codes = country.borders?.join(',')

    let neighbors = [] as Array<any>;

    if (codes) {
        neighbors = await getNeighbors(codes);
    }

    const preparedCountry = transformCountry(country) as any;

    preparedCountry.neighbors = neighbors;
    await cacheResponse(res, preparedCountry)
    res.status(200).json(preparedCountry);
}