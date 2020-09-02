import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { JobDetailsComponent } from './jobs/job-details/job-details.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'jobs',
    children: [
      { path: '', component: JobListComponent },
      { path: 'details/:id', component: JobDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
