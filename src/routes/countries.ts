import {Router} from 'express';
import {getAllCountries, getCountryByName} from "../contollers/countries";

const router = Router();

router.get('/', getAllCountries)
router.get('/name/:name', getCountryByName)
// router.get('/alpha', getCounterByCode)


export default router;