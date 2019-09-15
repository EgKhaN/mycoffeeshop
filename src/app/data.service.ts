import { Injectable } from '@angular/core';
import { Coffee } from './logic/coffee';
import { PlaceLocation } from './logic/PlaceLocation';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getList(callback) {
    // TODO: Change it with real webservice

    const list = [
      new Coffee('Double Expresso', 'Sunny Cafe', new PlaceLocation('123 Market St', 'San Francisco')),
      new Coffee('Caramel Americano', 'Starcoffee', new PlaceLocation('Gran Via 34', 'Madrid'))
    ];
    callback(list);
  }

  save(coffee: any, callback: (arg0: boolean) => void) {
    // TODO: Change it with real webservice
    callback(true);
  }
}
