import express from 'express';
import { apiRouter } from './routers/apiRouter.js';

const PORT = 9000;
const app = express();
//server public files
app.use(express.static('public'));
//list all houses
app.use('/api', apiRouter);
app
  .listen(PORT, () => {
    console.log('Express server connected to port:', PORT);
  })
  .on('err', (err) => {
    console.log('Fail to start server', err);
  });
