import { Component, OnInit, Input, OnChanges, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
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
  @Input() selectedCategoryTag: string;
  @Input() isFiltersCleared = false;
  @Output() allFilters = new EventEmitter<any>();
  filterForm: FormGroup;
  distancesInKm: { name: string; value: number; }[];
  salaries: { name: string; value: number; }[];
  period: { name: string; value: number; }[];
  jobTypes: { name: string; value: string; }[];
  jobType: { name: string; value: string; };
  jobTypeValues: number[] = [];
  categoryValues: string[] = [];
  minSalaries: { name: string; value: number; }[];
  maxSalaries: { name: string; value: number; }[];

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
        // const jobType = [...this.jobTypeValues];
        const jobType = { ...this.jobType };
        const category = [...this.categoryValues];
        const filters = { ...input };
        this.allFilters.emit(filters);
        console.log({ input }, 'new jobtype', { jobType }, { filters });
      }
    });
  }

  ngOnChanges(): void {
    // if (this.isFiltersCleared) {
    //   if (this.filterForm) {
    //     this.filterForm.reset();
    //   }
    // }
    this.populateSelectedCategory();
  }

  populateSelectedCategory(): void {
    if (this.filterForm && this.selectedCategoryTag) { this.filterForm.get('category').setValue(this.selectedCategoryTag) }
  }
  setupForm(): void {
    this.filterForm = this.fb.group({
      distance: [10],
      minSalary: ['0'],
      maxSalary: ['0'],
      jobType: [''],
      maxDaysOld: ['0'],
      category: [''],
      location: ['']
    });
  }

  onJobTypeChange(value: string): void {
    // if (this.jobTypeValues.some(x => x === value)) {
    //   const index = this.jobTypeValues.findIndex(x => x === value);
    //   this.jobTypeValues.splice(index, 1);
    // } else {
    //   this.jobTypeValues.push(value);
    // }
    this.jobType = this.jobTypes.find(x => x.value === value);
    console.log('job type values', this.jobType);

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
      result.push({ name: `${index}`, value: index });
    }

    const minHigh = 55000;
    const maxHigh = 100000;
    for (let index = minHigh; index <= maxHigh; index += 5000) {
      result.push({ name: `${index}`, value: index });
    }

    console.log({ result });
    this.salaries = result;
    this.minSalaries = result;
    this.maxSalaries = result;
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
      { name: 'Last 24 Hours', value: 1 },
      { name: 'Last 3 Days', value: 3 },
      { name: 'Last Week', value: 7 },
      { name: 'Last two Weeks', value: 14 },
    ];
  }

  resetSalaries(type: string): void {
    switch (type) {
      case 'min':
        this.minSalaries = this.salaries;
        this.filterForm.get('minSalary').setValue('0');
        break;

      case 'max':
        this.maxSalaries = this.salaries;
        this.filterForm.get('maxSalary').setValue('0');
        break;
    }
  }

  onSalarySelected(type: string): void {
    console.log({ type });
    switch (type) {
      case 'min':
        const selectedMinSalary = +this.filterForm.get('minSalary').value;
        this.maxSalaries = this.maxSalaries.filter(s => s.value > selectedMinSalary);
        console.log('max sal', this.maxSalaries);

        break;

      case 'max':
        const selectedMaxSalary = +this.filterForm.get('maxSalary').value;
        this.minSalaries = this.minSalaries.filter(s => s.value < selectedMaxSalary);
        console.log('max sal', this.minSalaries);

        break;
    }
  }
}
