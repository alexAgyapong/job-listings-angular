import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Job } from '../../models/job';
import { faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss']
})
export class JobCardComponent implements OnInit, OnChanges {
  @Input() job: Job;
  @Output() filter = new EventEmitter<string>();
  @Output() shortListedJobs = new EventEmitter<Job[]>();
  @Output() addedToShortList = new EventEmitter<Job>();
  @Output() removedFromShortList = new EventEmitter<Job>();
  faCoffee = faCoffee;
  faHeart = faHeart;
  isShortListed = false;
  shortListed: Job[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.

  }

  public getSelectedFilter(event: string): void {
    console.log(event);
    this.filter.emit(event);
  }

  addToShortList(job: Job): void {
    this.isShortListed = true;
    this.addedToShortList.emit(job);
    console.log('short list', { job }, 'shortlisted added', this.shortListed);

  }

  removeFromShortList(job: Job): void {
    this.isShortListed = false;
    // const index = this.shortListed.findIndex(x => x.id === job.id);
    // this.shortListed.splice(index, 1);
    // this.shortListedJobs.emit(this.shortListed)
    this.removedFromShortList.emit(job);

    console.log('short list', { job }, 'shortlisted removed', this.shortListed);

  }
}
