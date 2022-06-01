const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/', (req, res) => {
  return res.send('Hello World');
});

app.listen(3000, () => {
  console.log('API listening on port 3000');
});
