import { Component, OnInit } from '@angular/core';
import { ListingsService } from './../shared/services/listings.service';
import { GeocodeService } from './../shared/services/geocode.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private listingsService: ListingsService, private geocodeService: GeocodeService) { }

  ngOnInit(): void {
    // this.listingsService.getListings().subscribe(res => console.log({ res }));
    this.getCurrentLocation();

  }

  getCurrentLocation(): any {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((loc) => {
        console.log(loc);
        if (loc) {
          const req = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };
          // this.geocodeService.getLocation(req).subscribe((res) => console.log({ res }));
        }
      }, () => console.log('rerror'));
    }
  }

}
