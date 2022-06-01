const express = require('express');
const cors = require('cors');
const api = require('./services/api');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/', (req, res) => {
  return res.send('Hello World');
});

app.get('/api/users', async (req, res) => {
  try {
    const { since = 0 } = req.query;

    const { data } = await api.get(`/users?since=${since}`);

    res.json({
      nextPage: `/api/users?since=${Number(since) + 30}`,
      data,
    });
  } catch (error) {
    res.json({ data: error });
  }
});

app.get('/api/users/:username/details', async (req, res) => {
  try {
    const { username } = req.params;

    const { data } = await api.get(`/users/${username}`);

    res.json({
      data,
    });
  } catch (error) {
    res.json({ data: error });
  }
});

app.listen(3000, () => {
  console.log('API listening on port 3000');
});
