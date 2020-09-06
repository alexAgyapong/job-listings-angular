import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  constructor(private http: HttpClient) { }

  getLocation(coords: { latitude: number, longitude: number }): Observable<any> {
    const params = new HttpParams().set('auth', environment.geocodeXYZApiKey);
    const url = `${environment.geocodeXYZBaseURL}/${coords.latitude},${coords.longitude}`;
    return this.http.get<any>(url, { params });
  }
}
