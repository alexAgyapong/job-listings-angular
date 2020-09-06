import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Category } from 'src/app/shared/models/job';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges {
  @Input() categories: Category[];
  @Output() allFilters = new EventEmitter<any>();
  filterForm: FormGroup;
  distancesInKm: { name: string; value: number; }[];
  salaries: { name: string; value: number; }[];
  period: { name: string; value: number; }[];
  jobTypes: { name: string; value: string; }[];
  jobTypeValues: number[] = [];
  categoryValues: string[] = [];

  get jobTypesControl(): FormControl {
    return this.filterForm.get('jobType') as FormControl;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setupForm();
    this.getDistances();
    this.getSalary();
    this.getPeriod();
    this.getJobTypes();

    this.filterForm.valueChanges.pipe(debounceTime(1000)).subscribe(input => {
      if (input) {
        const jobType = [...this.jobTypeValues];
        const category = [...this.categoryValues];
        const filters = { ...input, jobType };
        this.allFilters.emit(filters);
        // console.log({ input }, { jobType }, { filters });
      }
    });
  }

  ngOnChanges(): void {

  }

  setupForm(): void {
    this.filterForm = this.fb.group({
      distance: [10],
      minSalary: [''],
      maxSalary: [''],
      jobType: [''],
      maxDaysOld: [''],
      category: [''],
      location: ['']
    });
  }

  onJobTypeChange(value: number): void {
    if (this.jobTypeValues.some(x => x === value)) {
      const index = this.jobTypeValues.findIndex(x => x === value);
      this.jobTypeValues.splice(index, 1);
    } else {
      this.jobTypeValues.push(value);
    }
    console.log('job type values', this.jobTypeValues);

  }

  onCategoryChange(value: string): void {
    console.log({ value });
    if (this.categoryValues.some(x => x === value)) {
      const index = this.categoryValues.findIndex(x => x === value);
      this.categoryValues.splice(index, 1);
    } else {
      this.categoryValues.push(value);
    }

  }


  getDistances(): void {
    const result = [];
    for (let index = 0; index < 50; index += 5) {
      result.push({ name: `${index}Km`, value: index });
    }
    this.distancesInKm = result;
  }

  getSalary(): void {
    const result = [];
    const minLow = 10000;
    const maxLow = 50000;
    for (let index = minLow; index <= maxLow; index += 2000) {
      result.push({ name: `£${index}`, value: index });
    }

    const minHigh = 55000;
    const maxHigh = 100000;
    for (let index = minHigh; index <= maxHigh; index += 5000) {
      result.push({ name: `£${index}`, value: index });
    }

    console.log({ result });
    this.salaries = result;

  }

  getJobTypes(): void {
    this.jobTypes = [
      { name: 'Permanent', value: 'permanent' },
      { name: 'Contract', value: 'contract' },
      { name: 'Full-Time', value: 'full_time' },
      { name: 'Part-Time', value: 'part_time' },
    ];
  }

  getPeriod(): void {
    this.period = [
      { name: 'Today', value: 1 },
      { name: 'Last Week', value: 7 },
      { name: 'Last two Weeks', value: 14 },
    ];
  }
}
