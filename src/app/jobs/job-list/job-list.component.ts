import { Component, OnInit } from '@angular/core';
import { ListingsService } from 'src/app/shared/services/listings.service';
import { tap, map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { Job } from 'src/app/shared/models/job';
@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  resultCount: number;
  jobs$ = new Observable<Job[]>();


  constructor(private listingsService: ListingsService) { }

  ngOnInit(): void {
    this.jobs$ = this.listingsService.getListings()
      .pipe(tap(data => this.resultCount = data.count),
        map(res => res.results),
        tap(data => console.log({ data }, 'count:', this.resultCount))
      )
    // .subscribe(res => console.log({ res }));
  }

}
