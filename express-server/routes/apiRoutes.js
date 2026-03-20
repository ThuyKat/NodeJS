import express from 'express';
import { servicesController } from '../controllers/servicesController';
import { productsController } from '../controllers/productsController';

export const apiRouter = express.Router();
apiRouter.get('/products', productsController);
apiRouter.get('/services', servicesController);
