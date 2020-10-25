const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const config = require('./config/config');
const add = require('./add');
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const https = require('https');

const options = {
  hostname: 'lk.easyway.ru',
  port: 443,
  path: '',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic dGVzdDo2MUlmaGp1a2pu'
  }
};

app.listen(process.env.PORT || config.port,
  () => console.log(`Server start on port ${config.port} ...`));

app.get('/orders', async (req, res) => {

  const query = "/EasyWay/odata/standard.odata/Document_упЗаявкаНаПеревозкуГруза?$format=json" +
    "&$filter=DeletionMark eq false and ВидПеревозки_Key eq guid'15c595c2-659a-11e8-80dd-00155d56803c'" +
    "and АдресПолучения_Key eq guid'e30358eb-a9f2-11e8-80de-00155d56803c'" +
    "and Заказчик_Key eq guid'0de29449-476a-11e6-80e6-003048baa05f'" +
    "&$select=Ref_Key, Date, Number,НомерКИС,EWA_ИндексПЭК,ГрузовыеМеста/Ref_Key" +
    "&$orderby=Date desc" +
    "&$top=40";  

  options.path = encodeURI(query);

  const request = https.request(options, response => {
    
    var body = '';

    response.on('data', d => {

      body += d;
    });

    response.on('end', () => {
      res.send(JSON.parse(body));
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

app.get('/orders2', async(req, res) => {

  console.log('Api Key:' + req.query.apiKey);

  options.path = add.query({
    table: "InformationRegister_События_EWA/SliceLast()",
    fields: "Period, Заявка_Key, ТипСобытия_EWA/Description",
    filter: "Заявка/Заказчик_Key eq guid'0de29449-476a-11e6-80e6-003048baa05f' and Заявка/АдресПолучения_Key eq guid'" + req.query.apiKey + "' and (ТипСобытия_EWA_Key  eq guid'b3e0596a-6b97-11e6-80e9-003048baa05f' or ТипСобытия_EWA_Key eq guid'675f4358-6f61-11e6-80ea-003048baa05f' or ТипСобытия_EWA_Key eq guid'675f4358-6f61-11e6-80ea-003048baa05f' or ТипСобытия_EWA_Key eq guid'fa32cea9-3996-11e9-80fc-00155d032908')",
    expand: "ТипСобытия_EWA"    
  });

  const request = https.request(options, response => {
    
    var body = '';

    response.on('data', d => {
      body += d;      
    });

    response.on('end', () => {
      
      var result = {isError: false, data: null, errors: []};

      try {
        var reqOb = JSON.parse(body);

        if (reqOb.value){
          result.data = reqOb.value;
        }
        else {
          result.isError = true;
          result.errors.push(reqOb);
        }
      } catch(err) {
          result.isError = true;
          result.errors.push(err);
      }
       
      res.send(result);
    });

    response.on('error', d => {
      res.send(d);
    });
  });

  request.on('error', error => {
    res.send(error);
  });

  request.end();
});
