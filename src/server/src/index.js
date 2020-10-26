const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const config = require('./config/config');
const ewaApi = require('./ewaApi');
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());


app.listen(process.env.PORT || config.port,
  () => console.log(`Server start on port ${config.port} ...`));



app.get('/v2/orders', async(req, res) => {
  
  var request = ewaApi.getOrders(res, req.query.apiKey);

  request.on('error', error => {
    res.send({isError: true, data: null, errors: [error]});
  });

  request.end();
});

app.get('/v2/order', async(req, res) =>{
  
  const request = ewaApi.getOrder(res, req.query.id);

  request.on('error', error => {
    res.send({isError: true, data: null, errors: [error]});
  });

  request.end();
});

app.get('/v2/contact', async(req, res) => {
  
  const request = ewaApi.getContactInfo(res, req.query.id);

  request.on('error', error => {
    res.send({isError: true, data: null, errors: [error]});
  });

  request.end();
});

app.get('/v2/place', async(req, res) => {
  
  const request = ewaApi.getPlace(res, req.query.id);

  request.on('error', error => {
    res.send({isError: true, data: null, errors: [error]});
  });

  request.end();
});
