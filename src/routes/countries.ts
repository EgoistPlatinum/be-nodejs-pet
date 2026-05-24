import { Router } from 'express';

import publicCache from '../middlewares/public-cache';
import cacheMiddleware from '../middlewares/cache-middleware';
import {getAllCountries, getCountryByName} from "../contollers/countries";

const router = Router();

router.get('/', [publicCache, cacheMiddleware(300)], getAllCountries);
router.get(
  '/name/:name',
  [publicCache, cacheMiddleware(300)],
  getCountryByName
);

export default router;
