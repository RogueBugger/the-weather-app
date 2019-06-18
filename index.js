const express = require("express");
const app = express();
const Datastore = require("nedb");
const fetch = require("node-fetch");
require('dotenv').config();
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log("listening at 8080") });
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (request, response) => {
    database.find({}, (error, data) => {
        response.json(data);
    });
});

app.post("/api", (request, response) => {
    const timestamp = Date.now();
    const data = request.body;
    data.timestamp = timestamp;
    console.log("got a request");
    database.insert(data);
    response.json(data);
});

app.get("/weather/:latlon", async(request, response) => {
    const json = request.params.latlon.split(",");
    const latitude = json[0];
    const longitude = json[1];
    const api_key = process.env.api_key;
    const weather_url = `https://api.darksky.net/forecast/${api_key}/${latitude},${longitude}/?units=si`;
    const weather_response = await fetch(weather_url);
    const weather = await weather_response.json();
    const aq_url = `https://api.openaq.org/v1/latest?coordinates=${latitude},${longitude}`;
    const aq_response = await fetch(aq_url);
    const airQuality = await aq_response.json();
    const data = {
        weather,
        airQuality
    };
    response.json(data);
});