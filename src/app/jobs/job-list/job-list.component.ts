import { Component, OnInit } from '@angular/core';
import { ListingsService } from 'src/app/shared/services/listings.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Job, JobRequestOptions, Category } from 'src/app/shared/models/job';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterType } from './../../shared/models/job';
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
  searchForm: FormGroup;

  constructor(private listingsService: ListingsService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.searchForm = this.fb.group({ what: [''], where: [''] });
    this.req = {
      what: this.searchForm.get('what').value || 'Fullstack developer',
      where: this.searchForm.get('where').value || 'London',
      pageSize: 20
    };

    this.getJobs(this.req);
    this.getCategories();
    // .subscribe(res => console.log({ res }));
  }


  private getJobs(req: JobRequestOptions): void {
    this.jobs$ = this.listingsService.getListings(req)
      .pipe(tap(data => this.resultCount = data.count),
        map(res => res.results)
        // tap(data => console.log({ data }, 'count:', this.resultCount))
      );
  }

  private getCategories(): void {
    this.categories$ = this.listingsService.getCategories();
  }

  searchJobs(): void {
    const req = { ...this.req, ...this.searchForm.value };
    console.log('here in search', req);
    this.getJobs(req);
  }

  getAllFilters(filters: any): void {
    if (filters) {
      let req = { ...this.req, ...filters } as JobRequestOptions;
      this.getJobTypeParams(filters.jobType, req);
      console.log({ req }, 'in all filters');

      this.getJobs(req);
    }
  }

  getJobTypeParams(types: string[], req: JobRequestOptions): void {
    types.forEach(x => {
      if (x === 'permanent') { req.permanent = '1'; }
      if (x === 'contract') { req.contract = '1'; }
      if (x === 'full_time') { req.full_time = '1'; }
      if (x === 'part_time') { req.part_time = '1'; }
    });
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
