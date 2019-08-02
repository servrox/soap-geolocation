"use strict";

const soap = require('soap');
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const opencage = require('opencage-api-client');

let db = []; // QuickFix

async function getCoords(args) {
  const city = args.city;

  const coords = await new Promise((resolve, reject) => {
    opencage
      .geocode({ q: city, limit: 1 })
      .then(data => {
        resolve(`${data.results[0].geometry.lat}, ${data.results[0].geometry.lng}`);
      })
      .catch(error => {
        console.log('error', error.message);
        resolve('unknown');
      })
  });
  
  db.unshift(`${city} | ${coords}`);
  return { coords: coords };
}

function getHistory(args) {
  const geoCodeResults = [];
  const count = args.processedTransactionsCount;
  let loop;
  
  if (count > db.length) {
    loop = db.length;
  } else {
    loop = count; 
  }

  for (let i = 0; i < loop; i++) {
    geoCodeResults.push(db[i]);    
  }

  return { geoCodeResults: geoCodeResults };
}

const serviceObject = {
  GeoService: {
        GeoServiceSoapPort: {
          GeoCode: getCoords,
          FetchHistory: getHistory
        },
        GeoServiceSoap12Port: {
          GeoCode: getCoords,
          FetchHistory: getHistory
        }
    }
};
const port = 8000;
const xml = fs.readFileSync('service.wsdl', 'utf8');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Geocoding application with a SOAP interfaces and an angular app for testing.');
})

app.listen(port, () => {
  console.log('Listening on port ' + port);
  const wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");
});