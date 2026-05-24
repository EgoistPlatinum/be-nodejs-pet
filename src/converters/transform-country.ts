const extractNativeName = (nativeName: any) =>
  (Object.values(nativeName)[0] as any).common;

const extractCurrencies = (currency: any) =>
  Object.values(currency).map((val: any) => val.name);

const extractValues = (obj: Record<string, string>) => Object.values(obj);

const transformCountry = (country: any) => {
  return {
    name: country.name.common,
    nativeName: extractNativeName(country.name.nativeName),
    flag: country.flags.svg,
    capital: country.capital[0],
    population: country.population,
    region: country.region,
    subregion: country.subregion,
    topLevelDomain: country.tld,
    currencies: extractCurrencies(country.currencies),
    languages: extractValues(country.languages),
    borders: country.borders,
  };
};

export default transformCountry;
