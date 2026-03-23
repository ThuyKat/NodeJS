import express from 'express';
import { apiRouter } from './routes/apiRoutes';
const PORT = 8000;
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRouter);
app.use('/api/post', postRouter);
//if route unfound
app.use((req, res) => {
  res.status('404').json({ message: 'Endpoint not found' });
});
app
  .listen(PORT, () => console.log(`server connected on port ${PORT}`))
  .on('error', (err) => {
    console.log('Failed to start server', err);
  });
