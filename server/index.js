const express = require('express');
const path = require('path');
const cors = require('cors');

const logger = require('./middleware/logger');
const { getPackageDictionary } = require('./controllers/packageReader');

const port = 5000;
const app = express();

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(`${__dirname}/build/index.html`), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

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
