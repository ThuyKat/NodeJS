import express from 'express';
export const apiRoutes = express.Router();
apiRoutes.post('/new', processPost);
