import { Injectable } from '@angular/core';
import { Coffee } from './logic/coffee';
import { PlaceLocation } from './logic/PlaceLocation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  public endpoint = 'http://localhost:3000';

  get(coffeeId: string, callback) {
    this.http.get(`${this.endpoint}/coffees/${coffeeId}`).subscribe(response => {
      callback(response);
    });
  }
  getList(callback) {
    this.http.get(`${this.endpoint}/coffees`).subscribe(response => {
      callback(response);
    });
  }

  save(coffee: any, callback: (arg0: boolean) => void) {
    if (coffee._id) {
      // it's an update
      this.http.put(`${this.endpoint}/coffees/${coffee._id}`, coffee).subscribe(response => {
        callback(true);
      });
    } else {
      // it's an insert
      this.http.post(`${this.endpoint}/coffees`, coffee).subscribe(response => {
        callback(true);
      });
    }
  }
}
