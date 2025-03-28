import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRequestParams } from '../models/api';
import { ILibrary, IWrapper } from '../models/library';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = 'https://apidata.mos.ru/v1/';
  private readonly apiKey: string = '12125b2a-b29d-46ff-bd1b-b2dff10cb66a';

  public getLibrariesCount(params: IRequestParams): Observable<number> {
    let httpParams: HttpParams = new HttpParams().set('api_key', this.apiKey);
    if(params.$filter){
      httpParams = httpParams.set('$filter', params.$filter);
    }
    return this.http.get<number>(`${this.apiUrl}datasets/${params.id}/count`, { params: httpParams });
  }

  public getLibraries(params: IRequestParams): Observable<IWrapper<ILibrary>[]> {
    let httpParams: HttpParams = new HttpParams();
    params.api_key = this.apiKey;

    Object.keys(params).forEach(key => {
      const value = params[key as keyof IRequestParams];
      if (value && key !== 'id') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    params.api_key = this.apiKey;
    return this.http.get<IWrapper<ILibrary>[]>(`${this.apiUrl}datasets/${params.id}/rows`, { params: httpParams });
  }
}
