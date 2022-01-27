const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

//enable CORS at our backend
app.use(cors());

// general template and checking that everything is up and running
app.get("/", (req, res) => {
  res.json("Hi"); // show the response in browser
});

//Getting the News from the API
app.get("/news", (req, res) => {
  const options = {
    method: "GET",
    url: "https://crypto-news-live3.p.rapidapi.com/news",
    headers: {
      "x-rapidapi-host": "crypto-news-live3.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

//Getting the currencies rates from API
app.get("/converter", (req, res) => {
  // getting Request Parameters from frontend
  const toCurrency = req.query.to_currency;
  const fromCurrency = req.query.from_currency;
  // console.log(req.query.to_currency); // to check value in terminal

  // Request
  const options = {
    method: "GET",
    url: "https://alpha-vantage.p.rapidapi.com/query",
    params: {
      from_currency: fromCurrency,
      function: "CURRENCY_EXCHANGE_RATE",
      to_currency: toCurrency,
    },
    headers: {
      "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      let exchangeRate =
        response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
      res.json(exchangeRate);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(8000, () =>
  console.log(`Server is running and listening on ${PORT}`)
);
