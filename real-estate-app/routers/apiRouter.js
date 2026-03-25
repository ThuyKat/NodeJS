import { homeController } from '../controllers/homeController.js';
import express from 'express';
export const apiRouter = express.Router();
apiRouter.get('/:listingType', homeController);
apiRouter.get('/:listingType/:filters', homeController);
