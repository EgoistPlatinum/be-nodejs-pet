import {BASE_URL} from "../constants/urls";
import extractNames from "../helpers/extract-names";

const getNeighbors = async (codes: string) => {
    const response = await fetch(`${BASE_URL}alpha?codes=${codes}`);
    const data = await response.json();

    return extractNames(data);
}

export default getNeighbors;