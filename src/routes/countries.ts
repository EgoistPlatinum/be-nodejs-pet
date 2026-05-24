import { Router } from 'express';

import { getAllCountries, getCountryByName } from '../controllers/countries';
import publicCache from '../middlewares/public-cache';
import cacheMiddleware from '../middlewares/cache-middleware';

const router = Router();

router.get('/', [publicCache, cacheMiddleware(300)], getAllCountries);
router.get(
  '/name/:name',
  [publicCache, cacheMiddleware(300)],
  getCountryByName
);

export default router;
