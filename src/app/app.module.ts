import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

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
import { environment } from 'src/environments/environment';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { ShortlistComponent } from './jobs/shortlist/shortlist.component';
import { RemoveHyphenPipe } from './shared/pipes/remove-hyphen.pipe';

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
    SearchComponent,
    ShortlistComponent,
    RemoveHyphenPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    FontAwesomeModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleAppId
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId'),
          },
          {
            id: AmazonLoginProvider.PROVIDER_ID,
            provider: new AmazonLoginProvider(
              'clientId'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
