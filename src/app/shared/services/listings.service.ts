import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { JobResponse } from './../models/job';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(private http: HttpClient) { }

  getListings(page: number = 1) {
    const options = this.appendParams();
    const url = `${environment.baseURL}/jobs/gb/search/${page}`;
    return this.http.get<JobResponse>(url, { params: options });
  }

  public appendParams(): HttpParams {
    const options = new HttpParams()
      .set('app_id', environment.appId)
      .set('app_key', environment.appKey);
    return options;
  }
}
