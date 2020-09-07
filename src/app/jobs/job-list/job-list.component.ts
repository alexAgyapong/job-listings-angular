import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
export class JobListComponent implements OnInit, AfterViewInit {
  resultCount: number;
  jobs$ = new Observable<Job[]>();
  req: JobRequestOptions;
  categories$: Observable<Category[]>;
  searchForm: FormGroup;
  maxPageSize = 15;
  itemsPerPage = 20;
  @ViewChild('jobs') jobsTarget: ElementRef;


  constructor(private listingsService: ListingsService, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // this.searchForm = this.fb.group({ what: [''], where: [''] });
    // this.req = {
    //   what: this.searchForm.get('what').value || 'Fullstack developer',
    //   where: this.searchForm.get('where').value || 'London',
    //   pageSize: 20
    // };

    this.route.queryParamMap.subscribe(params => {
      const what = (params.get('what'));
      const where = (params.get('where'));
      this.req = { ...this.req, what, where };
      console.log('in route para', this.req);
      if (this.req) {
        this.getJobs(this.req);
      }
    });

    this.getCategories();
  }

  ngAfterViewInit() {
    // console.log('refhere', this.jobsTarget);
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

    // if (filters) {
    //   const req = { ...this.req, ...filters } as JobRequestOptions;
    //   this.getJobTypeParams(filters.jobType, req);
    //   console.log({ req }, 'in all filters');

    //   this.getJobs(req);
    // }
  }

  getJobTypeParams(jobType: string, req: JobRequestOptions): void {
    if (jobType === 'permanent') { req.permanent = '1'; }
    if (jobType === 'contract') { req.contract = '1'; }
    if (jobType === 'full_time') { req.full_time = '1'; }
    if (jobType === 'part_time') { req.part_time = '1'; }
  }


  getSelectedFilter(filter: string): void {
    console.log({ filter });
    this.getJobTypeParams(filter, this.req);
    this.getJobs(this.req);
    this.scroll(this.jobsTarget.nativeElement);
  }

  pageChanged(event: PageChangedEvent): void {
    console.log({ event });
    this.getJobs(this.req, event.page);
  }

  scroll(el: HTMLElement): void {
    el.scrollIntoView();
  }
}
