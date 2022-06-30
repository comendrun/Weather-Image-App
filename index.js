const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
const dotenv = require("dotenv");
const { response } = require("express");
dotenv.config();
const PORT = 8080;

const UNSPLASHAPIKEY = process.env.REACT_APP_UNSPLASH_API_KEY;

const openAPIKEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

// console.log(openAPIKEY)

app.use(cors());

app.get("/", (req, res) => {
  res.json("HI");
});

`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${openAPIKEY}&units=metric`;

app.get("/weather", (req, res) => {
  //   console.log(req);

  const options = {
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather",
    params: {
      appid: openAPIKEY,
      q: "urmia",
      units: "metric",
    },
  };
  axios
    .request(options)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
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

app.listen(8080, () => {
  console.log(`Server is Running on ${PORT}`);
});
