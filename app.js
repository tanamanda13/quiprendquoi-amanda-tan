const express = require('express');
const app = express();
// const port = 3000;
const dotenv = require('dotenv').config();
app.set('view engine', 'pug');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.render('index', { title: 'Accueil', name_app: 'Qui prend whaat ?' });
});

// create a event
app.post('/party', function(req, res) {
  console.log(req.body);
  res.send('Post ok!');
});

app.listen(process.env.PORT, () => console.log(`Front app listening on process.env.PORT ${process.env.PORT}!`));