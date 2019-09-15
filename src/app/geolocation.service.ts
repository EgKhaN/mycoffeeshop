import { Injectable } from '@angular/core';
import { PlaceLocation } from './logic/PlaceLocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  requestLocation(callback) {
    // W3C Geolocation API
    navigator.geolocation.getCurrentPosition(
      position => {
        callback(position.coords);

      },
      error => {
        callback(null);
      }
    );
  }

  getMapLink(location: PlaceLocation) {
    // Universal Link
    // <a href="https://maps.google.com/?q=Eiffel+Tower"> google map
    // <a href="https://maps.apple.com/?q=Eiffel+Tower"> apple map
    let query = '';
    if (location.latitude) {
      query = location.latitude + ',' + location.longitude;
    } else {
      query = `${location.address}, ${location.city}`;
    }

    if (/iPad|iPhone|ipad/.test(navigator.userAgent)) {
      return `https://maps.apple.com/?q=${query}`;
    } else {
      return `https://maps.google.com/?q=${query}`;
    }

  }
}
