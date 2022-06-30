const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const PORT = 8080;

const UNSPLASHAPIKEY = process.env.REACT_APP_UNSPLASH_API_KEY;
const openAPIKEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

app.use(cors());

app.get("/", (req, res) => {
  res.json(
    "Hello This is my Port for my API KEYS. Hope it never get EXPOSED :)"
  );
});

app.get("/weather", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather",
    params: {
      appid: openAPIKEY,
      q: req.query.q,
      units: "metric",
    },
  };
  axios
    .request(options)
    .then((response) => {
      if (!response.status === 200) throw new Error(response.statusText);
      res.json(response.data);
    })
    .catch((err) => {
      console.error(err.response.data);
      res.json(err.response.data);
    });
});

app.get("/unsplash", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.unsplash.com/photos/random/",
    params: {
      client_id: UNSPLASHAPIKEY,
      query: req.query.query,
      orientation: "portrait",
      content_filter: "low",
    },
  };
  axios
    .request(options)
    .then((response) => {
      res.json(response.data.urls.small);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
