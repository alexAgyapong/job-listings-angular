import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppInterceptor } from './../app-interceptor';
import { JobListComponent } from './jobs/job-list/job-list.component';
import { JobCardComponent } from './shared/components/job-card/job-card.component';
import { RemoveUnderscorePipe } from './shared/pipes/remove-underscore.pipe';
import { JobDetailsComponent } from './jobs/job-details/job-details.component';
import { RemoveHtmlTagsPipe } from './shared/pipes/remove-html-tags.pipe';
import { FiltersComponent } from './shared/components/filters/filters.component';
import { SearchComponent } from './shared/components/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JobListComponent,
    JobCardComponent,
    RemoveUnderscorePipe,
    JobDetailsComponent,
    RemoveHtmlTagsPipe,
    FiltersComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PaginationModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
