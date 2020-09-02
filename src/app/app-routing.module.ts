import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobListComponent } from './jobs/job-list/job-list.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'jobs',
    children: [
      { path: '', component: JobListComponent },
      // { path: 'search', component: HotelListComponent },
      // { path: 'details/:id', component: HotelDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
