const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();


const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors({ origin: '*' }));

app.use('/api/campaigns', require('./api/routes/campaign'));
app.use('/api/products', require('./api/routes/products'));

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./dist/frontend'))
}



app.listen(PORT, (req, res) => {
  console.log(`app listening   on http://localhost:${PORT}`);
});
 