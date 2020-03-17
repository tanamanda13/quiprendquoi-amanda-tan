const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.render('index', { title: 'Accueil', name_app: 'Qui prend whaat ?' });
});

// create a event
app.post('/party', (req, res) => {
  // console.log(req.body);
  // res.send('Post ok!');
  axios
  .post(`${process.env.API_URL}/party`, req.body)
  .then(({ data }) => res.redirect(`/party/${data._id}`))
  // .then(({data}) => console.log(data))
  .catch((err) => console.error(err));
});

// display a party
app.get('/party/:id', function(req, res) {
  // console.log(req.params.id)
  // res.render('party', { title: 'Page événement', name_app: 'Qui prend whaat ?' });
  axios
  .get(`${process.env.API_URL}/party/${req.params.id}`)
  .then(({ data }) =>
    res.render('party', {
      name_app: 'Qui prend whaat ?',
      party: data,
      title: 'Page événement'
    }),
  )
  .catch((err) => console.log(err));
});

app.listen(process.env.PORT, () => console.log(`Front app listening on process.env.PORT ${process.env.PORT}!`));