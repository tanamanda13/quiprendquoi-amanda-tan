const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('pwa'));

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
  // console.log(req.body);
  axios
  .get(`${process.env.API_URL}/party/${req.params.id}`)
  .then(({ data }) =>
    res.render('party', {
      name_app: 'Qui prend whaat ?',
      party: data,
      title: 'Page événement',
      url: `${process.env.FRONT_URL}:${process.env.PORT}/party/${data._id}`
    }),
  )
  .catch((err) => console.log(err));
});

// add item on a party
app.post(`/party/:id/items`, (req, res) => {
  // console.log(req.body);
  axios
  .post(`${process.env.API_URL}/party/${req.params.id}/items`, {
    name: req.body.name,
    user: req.body.user
  })
  .then(({data}) => console.log(data))
  .then(() => res.redirect(`/party/${req.params.id}`))
  .catch((err) => console.error(err));
});

// delete an item 
app.post(`/party/:id/items/:item`, (req, res) => {
  axios
  .get(`${process.env.API_URL}/party/${req.params.id}`)
  axios
  .delete(`${process.env.API_URL}/party/${req.params.id}/items/${req.params.item}`)
  .then(({data}) => console.log(data))
  .then(() => res.redirect(`/party/${req.params.id}`))
});


app.listen(process.env.PORT, () => console.log(`Front app listening on process.env.PORT ${process.env.PORT}!`));