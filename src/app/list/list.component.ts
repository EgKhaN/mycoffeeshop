import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Coffee } from '../logic/coffee';
import { Router } from '@angular/router';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: Coffee[];
  constructor(private data: DataService,
              private router: Router,
              private geoLocationService: GeolocationService) { }

  ngOnInit() {
    this.data.getList((list: Coffee[]) => {
      this.list = list;
    });
  }

  openMap(coffee: Coffee) {
    const mapURL = this.geoLocationService.getMapLink(coffee.location);
    location.href = mapURL;
  }

  share(coffee: Coffee) {
    const shareText = `I had this coffee at ${coffee.place} and for me it's a ${coffee.rating} star coffee`;
    if ('share' in navigator) { // browser'da bu özellik var mı kontrol et
      (navigator as any).share({
        title: coffee.name,
        text: shareText,
        url: window.location.href
      }).then(() => console.log('shared')).catch(() => console.log('share error '));
    } else {
      const shareUrl = `whatsapp://send?text=${encodeURIComponent(shareText)}!`;
      location.href = shareUrl;
    }
  }

  goToDetails(coffee: Coffee) {
    this.router.navigate(['/coffee', coffee._id]);
  }

}
