const express = require('express');
const cors = require('cors');

const logger = require('./middleware/logger');
const { getPackageDictionary } = require('./controllers/packageReader');

const port = 5000;
const app = express();

app.get('/api/packages', async (req, res) => {
  const packageDictionary = await getPackageDictionary('./pkgStatus.txt');
  res.json(packageDictionary);
});

app.get('/', (req, res) => {
  res.send('henlo frendos');
});

app.use(cors());
app.use(logger);

app.listen(port, () => console.log(`Server running on port ${port}!`));
