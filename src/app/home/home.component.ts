import { Component, OnInit } from '@angular/core';
import { ListingsService } from './../shared/services/listings.service';
import { GeocodeService } from './../shared/services/geocode.service';
import { Observable } from 'rxjs';
import { Category } from '../shared/models/job';
import { tap } from 'rxjs/operators';
import { faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SharedService } from './../shared/services/shared.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories$ = new Observable<Category[]>();
  jobTags = ['engineering-jobs', 'graduate-jobs', 'it-jobs', 'healthcare-nursing-jobs'];
  sectors: Category[];
  year = new Date().getFullYear();
  isTablet: boolean = false;

  constructor(private listingsService: ListingsService, private geocodeService: GeocodeService, private sharedService: SharedService) { }

  ngOnInit(): void {
    // this.listingsService.getListings().subscribe(res => console.log({ res }));
    this.getCurrentLocation();
    this.getCategories();
    this.isTablet = this.sharedService.isTabletBreakPoint();

  }

  private getCategories(): void {
    this.categories$ = this.listingsService.getCategories().pipe(tap((data) => this.getSectors(data)));
  }

  getSectors(data: Category[]): void {
    this.sectors = data.filter(x => this.jobTags.includes(x.tag));
    console.log({ data }, 'for selectors');

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
