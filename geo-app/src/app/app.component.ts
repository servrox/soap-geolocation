import { Component, OnInit } from '@angular/core';

import { NgxSoapService, Client } from 'ngx-soap';

@Component({
  selector: 'pro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'geo-app';
  client: Client;

  coords: string;
  geoCodeResults: string[];
  xmlResponseCoords: string;
  xmlResponseHistory: string;

  textValue = 'initial value';
  log = '';

  constructor(private soap: NgxSoapService) { }

  ngOnInit(): void {
    this.soap.createClient('http://localhost:8000/wsdl?wsdl')
      .then((client: Client) => {
        console.log('Client', client);
        this.client = client;
      })
      .catch(err => console.log('Error', err));
  }

  getCoords(name: string): void {
    this.client.call('GeoCode', { city: name }).subscribe(res => {
      this.xmlResponseCoords = res.responseBody;
      this.coords = res.result.coords;
    }, err => console.log(err));
  }

  getHistory(amount: number): void {
    this.client.call('FetchHistory', { processedTransactionsCount: amount }).subscribe(res => {
      this.xmlResponseHistory = res.responseBody;
      this.geoCodeResults = res.result.geoCodeResults;
    }, err => console.log(err));
  }
}
