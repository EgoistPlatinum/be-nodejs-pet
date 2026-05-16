import {Request, Response} from 'express';

const BASE_URL = 'https://restcountries.com/v2/';

export const getAllCountries = async (req: Request, res: Response) => {
    const response = await fetch(BASE_URL + 'all?fields=name,capital,flags,population,region');

    const data = await response.json();

    res.status(200).json(data);
};

export const getCountryByName = async (req: Request, res: Response) => {

    const name = req.params.name

    const response = await fetch(BASE_URL + 'name/' + name);

    const data = await response.json();

    res.status(200).json(data);
}

export const getCounterByCode = async (req: Request, res: Response) => {

    const codes = req.query.codes;

    const response= await fetch(BASE_URL + 'alpha?codes=' + codes);

    const data = await response.json();

    res.status(200).json(data);
}