import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/shared/models/job';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges {
  @Input() categories: Category[];
  filterForm: FormGroup;
  distancesInKm: { name: string; value: number; }[];
  salaries: { name: string; value: number; }[];
  period: { name: string; value: number; }[];
  jobTypes: { name: string; value: string; }[];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setupForm();
    this.getDistances();
    this.getSalary();
    this.getPeriod();
    this.getJobTypes();

    // this.filterForm.valueChanges.subscribe(input => console.log({ input }));
  }

  ngOnChanges(): void {
    console.log('cat in filter', this.categories);

  }

  setupForm(): void {
    this.filterForm = this.fb.group({
      distance: [10],
      minSalary: [''],
      maxSalary: [''],
      jobType: [''],
      datePosted: [''],
      category: [''],
      location: ['']
    });
  }

  onJobTypeChange(value: any) {
    console.log({ value });

  }

  onPostedDateChange(value: any) {
    console.log({ value });

  }
  onCategoryChange(value: any) {
    console.log({ value });

  }


  getDistances(): void {
    const result = [];
    for (let index = 0; index < 50; index += 5) {
      result.push({ name: `${index}Km`, value: index });
    }
    this.distancesInKm = result;
    console.log({ distances: result });
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
      { name: 'Permant', value: 'permanent' },
      { name: 'Temporary', value: 'temporary' },
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
