import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IClient } from '../../interfaces/client/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  protected http: HttpClient;
  public url: string;

  constructor(
    http: HttpClient
  ) {
    this.http = http;
    this.buildPaths();
  }

  getAll(filter?: {}): Observable<IClient[]> {
    const httpOptions = {
      params: new HttpParams({
        fromObject: filter
      })
    };

    return <Observable<IClient[]>>this.http.get(`${this.url}`, httpOptions);
  }

  get(id: number): Observable<IClient> {
    return <Observable<IClient>>this.http.get(`${this.url}/${id}`);
  }

  post(body: {}): Observable<IClient> {
    return <Observable<IClient>>this.http.post(`${this.url}`, body);
  }

  put(id: number, body: {}): Observable<IClient> {
    return <Observable<IClient>>this.http.put(`${this.url}/${id}`, body);
  }

  private buildPaths(): void {
    this.url = 'http://localhost:3000/clients';
  }
}
