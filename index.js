'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser').json();
let events = require('./db/starter.json');

app.get('/api/topanga', function (req, res) {
  res.send(events)
});

app.get('/api/topanga/:id/registry', function (req, res) {
  console.log(req.params.id)
  res.send(events)
});
app.get('/api/topanga/:id/guest', function (req, res) {
  res.send(events.guests)
});

app.post('/api/topanga/:id/guest', bodyParser, function (req, res) {
  console.log(req.body)
  let newGuest = {}
  newGuest.rsvp = {
    "delivery": {
      "email": true,
      "text": true,
      "selfQr": true,
      "topanga": true
    },
    "responded": false,
    "plus": 0,
    "comments": "this comment"
  }
  newGuest.id = req.body.firstName + req.body.lastName + events.nalaKaizer2019.weddingYear
  events.guests[newGuest.id] = req.body;
  res.send("Sucessful")
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening in PORT:${PORT}`);
});