import { Component, OnInit } from '@angular/core';
import { ListingsService } from 'src/app/shared/services/listings.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Job, JobRequestOptions, Category } from 'src/app/shared/models/job';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterType } from './../../shared/models/job';
import { ActivatedRoute } from '@angular/router';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';

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

  constructor(private listingsService: ListingsService, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // this.searchForm = this.fb.group({ what: [''], where: [''] });
    // this.req = {
    //   what: this.searchForm.get('what').value || 'Fullstack developer',
    //   where: this.searchForm.get('where').value || 'London',
    //   pageSize: 20
    // };

    this.route.queryParamMap.subscribe(params => {
      let what = (params.get('what'));
      let where = (params.get('where'));
      this.req = { ...this.req, what, where };
      console.log('in route para', this.req);
      if (this.req) {
        this.getJobs(this.req);
      }
    });

    this.getCategories();
  }


  private getJobs(req: JobRequestOptions, page?: number): void {
    this.jobs$ = this.listingsService.getListings(req, page)
      .pipe(tap(data => this.resultCount = data.count),
        map(res => res.results)
      );
  }

  private getCategories(): void {
    this.categories$ = this.listingsService.getCategories();
  }

  getAllFilters(filters: any): void {
    console.log('local req', this.req, 'filters from child', filters);

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

  pageChanged(event: PageChangedEvent): void {
    console.log({ event });
    this.getJobs(this.req, event.page);
  }
}
