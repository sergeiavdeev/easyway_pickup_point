//const { response } = require('express');
const https = require('https');

module.exports={
    options: {
        hostname: 'lk.easyway.ru',
        port: 443,
        path: '',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic dGVzdDo2MUlmaGp1a2pu'
        }
    },

    query: function(params) {
        var query = '/EasyWay/odata/standard.odata/'+ params.table + '?$format=application/json;odata=nometadata';

        if (params.filter) {
            query += '&$filter='+ params.filter;
        }

        if (params.fields) {
            query += '&$select=' + params.fields;
        }

        if (params.sort) {
            query += '&$orderby=' + params.sort;
        }

        if (params.count) {
            query += '&$top=' + params.count;
        }

        if (params.expand) {
            query += '&$expand=' + params.expand;
        }
        return encodeURI(query);
    },

    ordersConvert: function(src) {
        
        return src.map(el => {
            return {
                id: el.Заявка_Key, 
                statusId: el.ТипСобытия_EWA_Key,
                statusName: el.ТипСобытия_EWA.Description,
                stausDate: el.Period
            }    
        });        
    },

    orderConvert: function(src) {
        
        return {
            cargoIndex: src.EWA_ИндексПЭК,
            ewaId: src.Number,
            clientId: src.НомерКИС,
            placeCount: src.КоличествоМест,
            recieverId: src.КонтактноеЛицоПолучателя_Key,
            total: src.НаложенныйПлатеж,
            storagePeriod: src.EWA_СрокХранения,
            places: src.ГрузовыеМеста.map(el => {
                return {id: el.ГрузовоеМесто_Key};
            })
        }
    },

    contactInfoConvert: function(src) {

        return {
            name: src.Description,
            contacts: src.КонтактнаяИнформация.map(el => {
                return {type: el.Тип, value: el.Представление}
            })
        };
    },

    placeConvert: function(src) {
        
        return {
            barcode: src.Штрихкод, 
            width: src.Ширина,
            height: src.Высота,
            length: src.Длина,
            weight: src.Масса,
            volume: src.Объем
        }                 
    },

    //Выдан - b3e0596a-6b97-11e6-80e9-003048baa05f
    getOrders: function(response, apiKey) {

        this.options.path = this.query({
            table: "InformationRegister_События_EWA/SliceLast()",
            fields: "Period, Заявка_Key, ТипСобытия_EWA/Description, ТипСобытия_EWA_Key",
            filter: "Заявка/Заказчик_Key eq guid'0de29449-476a-11e6-80e6-003048baa05f' and Заявка/АдресПолучения_Key eq guid'" + apiKey + "' and (ТипСобытия_EWA_Key eq guid'675f4358-6f61-11e6-80ea-003048baa05f' or ТипСобытия_EWA_Key eq guid'b122101b-6f61-11e6-80ea-003048baa05f' or ТипСобытия_EWA_Key eq guid'fa32cea9-3996-11e9-80fc-00155d032908')",
            expand: "ТипСобытия_EWA"    
          });
        this.options.method = "GET";

        return https.request(this.options, res => {
    
            var body = '';
        
            res.on('data', d => {
              body += d;      
            });
        
            res.on('end', () => {
              
              var result = {isError: false, data: null, errors: []};
        
              try {
                var reqOb = JSON.parse(body);
        
                if (reqOb.value){
                  result.data = this.ordersConvert(reqOb.value);
                }
                else {
                  result.isError = true;
                  result.errors.push(reqOb);
                }
              } catch(err) {
                  result.isError = true;
                  result.errors.push(err);
              }
               
              response.send(result);
            });
        
            response.on('error', d => {
              response.send(d);
            });
          });
    },
    
    getOrder: function(response, id) {

        this.options.path = this.query({
            table: "Document_упЗаявкаНаПеревозкуГруза(guid('"+ id +"'))",
            fields: "Number, НомерКИС, EWA_ИндексПЭК, КонтактноеЛицоПолучателя_Key, КоличествоМест, НаложенныйПлатеж, EWA_СрокХранения, ГрузовыеМеста/ГрузовоеМесто_Key"
          });

        return https.request(this.options, res => {
    
            var body = '';
        
            res.on('data', d => {
              body += d;      
            });
        
            res.on('end', () => {
              
              var result = {isError: false, data: null, errors: []};
        
              try {
                var reqOb = JSON.parse(body);
        
                if (reqOb["odata.error"]){
                  result.isError = true;
                  result.errors.push(reqOb["odata.error"]);
                }
                else {
                  
                  result.data = this.orderConvert(reqOb);
                }
              } catch(err) {
                  result.isError = true;
                  result.errors.push(err);
              }            
              
              if (!result.isError) {

              }
              
              response.send(result);
            });
        
            res.on('error', d => {
              response.send(d);
            });    
          });
    },

    getContactInfo: function(response, id) {

        this.options.path = this.query({
            table: "Catalog_упКонтактныеЛицаПартнеров(guid('"+ id +"'))",
            fields: "Description, КонтактнаяИнформация/Тип, КонтактнаяИнформация/Представление"
        });

        return https.request(this.options, res => {
    
            var body = '';
        
            res.on('data', d => {
              body += d;      
            });
        
            res.on('end', () => {
              
              var result = {isError: false, data: null, errors: []};
        
              try {
                var reqOb = JSON.parse(body);
        
                if (reqOb["odata.error"]){
                  result.isError = true;
                  result.errors.push(reqOb["odata.error"]);
                }
                else {
                  
                  result.data = this.contactInfoConvert(reqOb);
                }
              } catch(err) {
                  result.isError = true;
                  result.errors.push(err);
              }            
              
              if (!result.isError) {

              }
              
              response.send(result);
            });
        
            res.on('error', d => {
              response.send(d);
            });    
          });
    },

    getPlace: function(response, id) {
        
        this.options.path = this.query({
            table: "Catalog_упГрузовыеМеста(guid('"+ id +"'))",
            fields: "Штрихкод, Длина, Ширина, Высота, Масса, Объем"
        });

        return https.request(this.options, res => {
    
            var body = '';
        
            res.on('data', d => {
              body += d;      
            });
        
            res.on('end', () => {
              
              var result = {isError: false, data: null, errors: []};
        
              try {
                var reqOb = JSON.parse(body);
        
                if (reqOb["odata.error"]){
                  result.isError = true;
                  result.errors.push(reqOb["odata.error"]);
                }
                else {
                  
                  result.data = this.placeConvert(reqOb);
                }
              } catch(err) {
                  result.isError = true;
                  result.errors.push(err);
              }            
              
              if (!result.isError) {

              }
              
              response.send(result);
            });
        
            res.on('error', d => {
              response.send(d);
            });    
          });
    },

    auth: function(response, login, password) {
      
      this.options.path = "/EasyWay/hs/EWA_API/lk/autorization";
      this.options.method = "POST";
      this.options.headers =  {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(login + ":" + password).toString("base64")
      };
      
      return https.request(this.options, res => {
        var body = "";
        var result = {isError: true, data: null, errors: []};

        res.on('data', d => {
          body += d;
        });

        res.on('end', () => {
                    
          try {
            var reqOb = JSON.parse(body);
            result.isError = false;
            result.data = reqOb;            
          } catch(e) {
            result.errors.push(e);
          }
          response.send(result);
        });

        res.on('error', e => {
          result.errors.push(e);
          response.send(result);
        });
      });
    }
} 