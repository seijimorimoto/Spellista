import Express from 'express';
import routes from './routes/routes';

const app: Express.Application = Express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(JSON.stringify({ Hello: 'World' }));
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Spellista server is running on port ${port}`);
});
