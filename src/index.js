require('dotenv/config');
const express = require('express');
const cors = require('cors');
const api = require('./services/api');

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/', (req, res) => {
  return res.send('Hello World');
});

app.get('/api/users', async (req, res) => {
  try {
    const { since = 0 } = req.query;
    const perPage = 10;
    const nextPage = `/api/users?since=${Number(since) + perPage}`;
    let previousPage = '/api/users';

    const { data } = await api.get(`/users?since=${since}&per_page=${perPage}`);

    if (since >= perPage) {
      previousPage = `/api/users?since=${Number(since) - perPage}`;
    }

    res.json({
      nextPage,
      previousPage,
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

app.get('/api/users/:username/repos', async (req, res) => {
  try {
    const { username } = req.params;

    const { data } = await api.get(`/users/${username}/repos`);

    res.json({
      data,
    });
  } catch (error) {
    res.json({ data: error });
  }
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
