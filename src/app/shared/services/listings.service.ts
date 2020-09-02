import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { JobResponse, JobRequestOptions } from './../models/job';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(private http: HttpClient) { }

  getListings(req?: JobRequestOptions, page: number = 1) {
    const options = this.appendParams(req);
    // options.set('where', req?.where);
    console.log({ options });

    const url = `${environment.baseURL}/jobs/gb/search/${page}`;
    return this.http.get<JobResponse>(url, { params: options });
  }

  public appendParams(req?: JobRequestOptions): HttpParams {
    const options = new HttpParams()
      .set('app_id', environment.appId)
      .set('app_key', environment.appKey)
      .set('what', req?.what)
      .set('where', req?.where)
      .set('results_per_page', req?.pageSize?.toString());

    return options;
  }
}
