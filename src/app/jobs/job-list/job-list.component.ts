import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, TemplateRef } from '@angular/core';
import { ListingsService } from 'src/app/shared/services/listings.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Job, JobRequestOptions, Category } from 'src/app/shared/models/job';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterType } from './../../shared/models/job';
import { ActivatedRoute } from '@angular/router';

import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from './../../shared/services/shared.service';

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
  maxPageSize: number;
  itemsPerPage = 20;
  @ViewChild('jobs') jobsTarget: ElementRef;

  modalRef: BsModalRef;
  faCoffee = faCoffee;
  faHeart = faHeart;
  shortListed: Job[] = [];
  isFiltersCleared: boolean;
  selectedCategoryTag: string;

  constructor(private listingsService: ListingsService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private modalService: BsModalService,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.isTabletBreakPoint() ? this.maxPageSize = 15 : this.maxPageSize = 5;

    this.route.queryParamMap.subscribe(params => {
      const what = params.get('what');
      const where = params.get('where');
      const category = params.get('category');
      this.req = { ...this.req, what, where, category };
      console.log('in route para', this.req);
      if (category) {
        this.selectedCategoryTag = category;
      }
      this.getJobs(this.req);
    });

    this.getCategories();
  }

  ngAfterViewInit(): void {
    // console.log('refhere', this.jobsTarget);
  }

  private getJobs(req: JobRequestOptions, page?: number): void {
    this.jobs$ = this.listingsService.getListings(req, page)
      .pipe(tap(data => this.resultCount = data.count),
        map(res => res.results),
        tap(data => this.setShortListedFlag(data))
      );
  }

  setShortListedFlag(jobs: Job[]): void {
    const data = localStorage.getItem('shortListed');
    const jobsFromStorage = JSON.parse(data) as Job[];
    if (jobsFromStorage && jobsFromStorage.length) {
      jobsFromStorage.forEach(j => {
        jobs.forEach(x => {
          if (j.id === x.id) {
            x.isShortListed = true;
            console.log('set....', { x }, { j });
          }
        });
      });
    }
    console.log({ jobs }, 'flags set');

  }
  private getCategories(): void {
    this.categories$ = this.listingsService.getCategories();
  }

  getAllFilters(filters: any): void {
    console.log('local req', this.req, 'filters from child', filters);

    if (filters) {
      const req = { ...this.req, ...filters } as JobRequestOptions;
      this.getJobTypeParams(filters.jobType, req);
      console.log({ req }, 'in all filters');

      this.getJobs(req);
    }
    if (this.modalRef) {
      this.modalRef.hide();
    }
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

  showModal(template: TemplateRef<any>): void {
    console.log('search clicked');
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-width' }));
  }

  showFilters(template: TemplateRef<any>): void {
    console.log('search clicked');
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-width' }));
  }

  clearFilters(): void {
    this.isFiltersCleared = true;
    console.log('clear filters');

  }

  hideModalOnSearch(isSearching: boolean): void {
    if (isSearching) {
      this.modalRef.hide();
    }
  }
  pageChanged(event: PageChangedEvent): void {
    console.log({ event });
    this.getJobs(this.req, event.page);
  }

  scroll(el: HTMLElement): void {
    el.scrollIntoView();
  }

  updateShortListed(job: Job): void {
    this.getShortListedFromLocalStorage();
    if (!this.shortListed.some(x => x.id === job.id)) {
      job = { ...job, isShortListed: true };
      this.shortListed.push(job);
      localStorage.setItem('shortListed', JSON.stringify(this.shortListed));
    }
    console.log({ job }, 'in list', this.shortListed);

  }

  getShortListedFromLocalStorage(): void {
    const data = localStorage.getItem('shortListed');
    const jobs = JSON.parse(data) as Job[];
    if (jobs && jobs.length) {
      this.shortListed = [...jobs]; console.log('from storage', this.shortListed);
    }
  }

  updateRemovedShortListed(job: Job): void {
    const index = this.shortListed.findIndex(x => x.id === job.id);
    this.shortListed.splice(index, 1);
    localStorage.setItem('shortListed', JSON.stringify(this.shortListed));
    console.log({ job }, 'removed in list', this.shortListed);
  }
}
