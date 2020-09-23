const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const config = require('./config/config');
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const https = require('https');

app.listen(process.env.PORT || config.port,
  () => console.log(`Server start on port ${config.port} ...`));

app.get('/orders', async (req, res) => {

  const query = "Document_упЗаявкаНаПеревозкуГруза?$format=json" +
    "&$filter=DeletionMark eq false and ВидПеревозки_Key eq guid'15c595c2-659a-11e8-80dd-00155d56803c'" +
    "and АдресПолучения_Key eq guid'e30358eb-a9f2-11e8-80de-00155d56803c'" +
    "and Заказчик_Key eq guid'0de29449-476a-11e6-80e6-003048baa05f'" +
    "&$select=Ref_Key, Date, Number,НомерКИС,EWA_ИндексПЭК,ГрузовыеМеста/Ref_Key" +
    "&$orderby=Date desc" +
    "&$top=40";


  const options = {
    hostname: 'lk.easyway.ru',
    port: 443,
    path: '/EasyWay/odata/standard.odata/' + encodeURI(query),
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic dGVzdDo2MUlmaGp1a2pu'
    }
  };

  const request = https.request(options, response => {
    response.on('data', d => {

      res.send(JSON.parse(d));
    });

    response.on('error', d => {
      res.send(d);
    })
  });

  request.on('error', error => {
    res.send(error);
  });

  request.end();
});
