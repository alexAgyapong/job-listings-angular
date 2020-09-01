import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(private http: HttpClient) { }

  getListings() {
    let options = this.appendParams();
    const url = `${environment.baseURL}/jobs/gb/search/1`;
    return this.http.get<any>(url, { params: options });
  }

  public appendParams(): HttpParams {
    const options = new HttpParams()
      .set('app_id', environment.appId)
      .set('app_key', environment.appKey);
    return options;
  }
}
