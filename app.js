const express = require('express');
const app = express();
// const port = 3000;
const dotenv = require('dotenv').config();

app.get('/', function(req, res) {
  res.send('tp quiprendquoi');
});

app.listen(process.env.PORT, () => console.log(`Front app listening on process.env.PORT ${process.env.PORT}!`));