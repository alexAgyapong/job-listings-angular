import { Component, OnInit } from '@angular/core';
import { ListingsService } from './../shared/services/listings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private listingsService: ListingsService) { }

  ngOnInit(): void {
    // this.listingsService.getListings().subscribe(res => console.log({ res }));

  }

}
