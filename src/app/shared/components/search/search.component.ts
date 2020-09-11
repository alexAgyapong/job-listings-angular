import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ListingsService } from '../../services/listings.service';
import { JobRequestOptions } from 'src/app/shared/models/job';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() isLargeInput = false;
  @Output() searchTerms = new EventEmitter<JobRequestOptions>();
  @Output() isSearching = new EventEmitter<boolean>();
  searchForm: FormGroup;
  req: JobRequestOptions;

  constructor(private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('current route', this.router.url);

    this.searchForm = this.fb.group({ what: [''], where: [''] });
    this.route.queryParamMap.subscribe(params => {
      this.searchForm.get('what').setValue(params.get('what'));
      this.searchForm.get('where').setValue(params.get('where'));
    });
    this.req = {
      what: this.searchForm.get('what').value,
      where: this.searchForm.get('where').value,
    };
  }

  searchJobs(): void {
    const req = { ...this.req, ...this.searchForm.value } as JobRequestOptions;
    const params: JobRequestOptions = {};
    if (req.what) { params.what = req.what; }
    if (req.where) { params.where = req.where; }
    this.isSearching.emit(true);
    this.router.navigate(['/jobs'], { queryParams: params });
  }
}
