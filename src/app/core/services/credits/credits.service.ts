import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICredit } from '../../interfaces/credit/credit';
import { IClientCredit } from '../../interfaces/client/client';

@Injectable({
  providedIn: 'root'
})
export class CreditsService {

  protected http: HttpClient;
  public url: string;

  constructor(
    http: HttpClient
  ) {
    this.http = http;
    this.buildPaths();
  }

  getAllClientCredit(filter?: {}): Observable<IClientCredit[]> {
    const httpOptions = {
      params: new HttpParams({
        fromObject: filter
      })
    };

    return <Observable<IClientCredit[]> >this.http.get(`${this.url}`, httpOptions);
  }

  getAll(filter?: {}): Observable<ICredit[]> {
    const httpOptions = {
      params: new HttpParams({
        fromObject: filter
      })
    };

    return <Observable<ICredit[]> >this.http.get(`${this.url}`, httpOptions);
  }

  get(id: number): Observable<ICredit> {
    return <Observable<ICredit>>this.http.get(`${this.url}/${id}`);
  }

  post(body: {}): Observable<ICredit> {
    return <Observable<ICredit>>this.http.post(`${this.url}`, body);
  }

  put(id: number, body: {}): Observable<ICredit> {
    return <Observable<ICredit>>this.http.put(`${this.url}/${id}`, body);
  }

  private buildPaths(): void {
    this.url = 'http://localhost:3000/credits';
  }
}
