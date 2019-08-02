<img src="https://img.shields.io/badge/servrox-approved-brightgreen.svg?style=flat&link=http://servrox.solutions&link=http://servrox.solutions&logo=data:image/png;base64,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" />

# Geocode Application

Geocoding application with a SOAP interfaces and an angular app for testing.

<img src="geolocation-soap.png">
<br/><br/>

## Local Dev Setup

```
git clone https://github.com/servrox/soap-geolocation.git
cd soap-geolocation
npm run inst
npm run dev
```

```
UI: http://localhost:4200
Soap Service: http://localhost:8000/wsdl?wsdl
```

## Built With

- [Angular CLI](https://github.com/angular/angular-cli) - version 8.2.0
- [ngx-soap](https://github.com/lula/ngx-soap) - version 0.6.0

- [express](https://expressjs.com/) - version 4.17.1
- [soap](https://github.com/vpulim/node-soap) - version 0.29.0
- [opencage-api-client](https://github.com/tsamaya/opencage-api-client) - version 0.5.0

## Authors

- **Marcel Mayer**
