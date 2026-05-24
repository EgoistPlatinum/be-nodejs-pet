const mapCountry = (country: any) => {
  return {
    name: country.name.common,
    capital: country.capital[0],
    region: country.region,
    population: country.population,
    flags: {
      svg: country.flags.svg,
      png: country.flags.png,
    },
  };
};

const compareCountryNames = (a: any, b: any): number => {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
};

const transformAllCountries = (countries: any[]) => {
  return countries.map(mapCountry).sort(compareCountryNames);
};

export default transformAllCountries;
