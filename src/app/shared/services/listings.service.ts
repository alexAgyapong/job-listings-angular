import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { JobResponse, JobRequestOptions, Job, Category } from './../models/job';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(private http: HttpClient) { }

  getListings(req?: JobRequestOptions, page: number = 1): Observable<JobResponse> {
    const options = this.appendParams(req);
    const url = `${environment.baseURL}/jobs/gb/search/${page}`;
    return this.http.get<JobResponse>(url, { params: options });
  }

  getCategories(): Observable<Category[]> {
    const options = this.appendKeyParams();
    console.log({ options });

    const url = `${environment.baseURL}/jobs/gb/categories`;
    return this.http.get<any>(url, { params: options }).pipe(map(res => res.results), tap(data => console.log({ data })));
  }

  public appendKeyParams(): HttpParams {
    const options = new HttpParams()
      .set('app_id', environment.appId)
      .set('app_key', environment.appKey);

    return options;
  }

  public appendParams(req?: JobRequestOptions): HttpParams {
    const minSalary = '10000';
    const maxSalary = '100000';
    const pageSize = '20';

    let options = new HttpParams({
      fromObject: {
        app_id: environment.appId,
        app_key: environment.appKey,
        what: req?.what || '',
        where: req?.where || '',
        salary_min: req?.minSalary > 0 ? req?.minSalary?.toString() : minSalary,
        salary_max: req?.maxSalary > 0 ? req?.maxSalary?.toString() : maxSalary,

        category: req?.category || '',
        max_days_old: req?.maxDaysOld?.toString() || '',
        results_per_page: req?.pageSize?.toString() || pageSize,

        // distance: req?.distance?.toString() || '',
        // permanent: req?.permanent || '0'
        // contract: req?.contract || '0',
        // full_time: req?.full_time || '0',
        // part_time: req?.part_time || '0',

      }
    });

    if (req.distance) { options = options.append('distance', req?.distance.toString()); }
    if (req.permanent) { options = options.append('permanent', req?.contract); }
    if (req.contract) { options = options.append('contract', req?.contract); }
    if (req.full_time) { options = options.append('full_time', req?.full_time); }
    if (req.part_time) { options = options.append('part_time', req?.part_time); }

    // .set('app_id', environment.appId)
    // .set('app_key', environment.appKey)
    // .set('what', req?.what)
    // .set('where', req?.where)
    // // .set('full_time', req?.full_time || '0')
    // // .set('part_time', req?.part_time || '0')
    // // .set('contract', req?.contract || '0')
    // .set('min_salary', req?.minSalary?.toString())
    // .set('max_salary', req?.maxSalary?.toString())
    // .set('category', req?.category)
    // .set('job_type', req?.jobType?.toString())
    // .set('max_days_old', req?.maxDaysOld?.toString())
    // .set('results_per_page', req?.pageSize?.toString());

    return options;
  }
}
