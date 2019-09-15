import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coffee } from '../logic/coffee';
import { GeolocationService } from '../geolocation.service';
import { TastingRating } from '../logic/TastingRating';
import { Route } from '@angular/compiler/src/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css']
})
export class CoffeeComponent implements OnInit {

  coffee: Coffee;
  tastingEnabled: boolean = false;

  types = ['Eskpresso', 'Americano', 'Ristretto'];
  routingSubscription: any;

  constructor(private route: ActivatedRoute,
              private geolocation: GeolocationService,
              private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
    this.coffee = new Coffee();

    this.routingSubscription = this.route.params.subscribe(params => {
      if (params.id) {
        this.dataService.get(params.id, response => {
          this.coffee = response;
          if (this.coffee.tastingRating) {
            this.tastingEnabled = true;
          }
        });
      }
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
    this.router.navigate(['/']);
  }

  save() {
    this.dataService.save(this.coffee, result => {
      if (result) {
        this.router.navigate(['/']);
      }
    });
  }

  OnDestroy() {
    this.routingSubscription.unsubscribe();
  }

}
