const express = require("express");
const cors = require("cors");
const { urlencoded, json } = require("express");
const morgan = require("morgan");

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.set("keyauth", "thisismykeybitch123");

app.set("port", process.env.PORT || 3000);

module.exports = app;

