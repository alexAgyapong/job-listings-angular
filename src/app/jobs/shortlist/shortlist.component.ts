import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/shared/models/job';

@Component({
  selector: 'app-shortlist',
  templateUrl: './shortlist.component.html',
  styleUrls: ['./shortlist.component.scss']
})
export class ShortlistComponent implements OnInit {
  jobs: Job[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getShortListedFromLocalStorage();
  }

  getShortListedFromLocalStorage(): void {
    const data = localStorage.getItem('shortListed');
    const jobs = JSON.parse(data) as Job[];
    if (jobs && jobs.length) {
      this.jobs = [...jobs];
    }
  }

  updateRemovedShortListed(job: Job): void {
    const index = this.jobs.findIndex(x => x.id === job.id);
    this.jobs.splice(index, 1);
    localStorage.setItem('shortListed', JSON.stringify(this.jobs));
    console.log({ job }, 'removed in list', this.jobs);
  }

}
