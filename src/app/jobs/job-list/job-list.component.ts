import { Component, OnInit } from '@angular/core';
import { ListingsService } from 'src/app/shared/services/listings.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Job, JobRequestOptions, Category } from 'src/app/shared/models/job';
@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  resultCount: number;
  jobs$ = new Observable<Job[]>();
  req: JobRequestOptions;
  categories$: Observable<Category[]>;

  constructor(private listingsService: ListingsService) { }

  ngOnInit(): void {
    this.req = {
      what: 'Fullstack developer',
      where: 'London',
      pageSize: 20
    };
    this.getJobs(this.req);
    this.getCategories();
    // .subscribe(res => console.log({ res }));
  }


  private getJobs(req: JobRequestOptions): void {
    this.jobs$ = this.listingsService.getListings(req)
      .pipe(tap(data => this.resultCount = data.count),
        map(res => res.results),
        tap(data => console.log({ data }, 'count:', this.resultCount))
      );
  }

  private getCategories(): void {
    this.categories$ = this.listingsService.getCategories();
  }

  getSelectedFilter(filter: string): void {
    console.log({ filter });
    switch (filter) {
      case 'full_time':
        this.req.full_time = '1';
        console.log('req', this.req);

        this.getJobs(this.req);
        break;
      case 'part_time':
        this.req.part_time = '1';
        console.log('req with part time', this.req);

        this.getJobs(this.req);
        break;
      case 'contract':
        this.req.contract = '1';
        console.log('req with part time', this.req);

        this.getJobs(this.req);
        break;

      default:
        break;
    }

  }
}
