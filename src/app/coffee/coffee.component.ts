import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coffee } from '../logic/coffee';
import { GeolocationService } from '../geolocation.service';
import { TastingRating } from '../logic/TastingRating';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {

  coffee: Coffee;
  types = ['Eskpresso', 'Americano', 'Ristretto'];
  routingSubscription: any;

  constructor(private route: ActivatedRoute,
              private geolocation: GeolocationService) { }

  ngOnInit() {
    this.coffee = new Coffee();

    this.routingSubscription = this.route.params.subscribe(params => {
      console.log(params.id);
    });

    this.geolocation.requestLocation((location: { latitude: number; longitude: number; }) => {
      if (location) {
        this.coffee.location.latitude = location.latitude;
        this.coffee.location.longitude = location.longitude;
      }
    });
  }


  tastingRatingChange(checked: boolean) {
    if (checked) {
      this.coffee.tastingRating = new TastingRating();
    } else {
      this.coffee.tastingRating = null;
    }
  }

  cancel() {

  }

  save() {

  }

  OnDestroy() {
    this.routingSubscription.unsubscribe();
  }

}
