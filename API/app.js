const express = require('express');
const routes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(JSON.stringify({ Hello: 'World' }));
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Spellista server is running on port ${port}`);
});
