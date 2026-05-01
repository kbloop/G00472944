import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyHttp {
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDQ2N2IxMTE3NjA1N2NmODI2M2E5MmZjY2RmZjdhNSIsIm5iZiI6MTc3NzY3MzQ0MS42NDUsInN1YiI6IjY5ZjUyNGUxZTkzNTI2YzQ4NmMwNTk4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8ayssOPpdNFKAS4DbCVj1XUSe67Xm2hM0NeDfMcaIz0'
    }
  };

  constructor(private http: HttpClient) {};

  get(url:string): Observable<any> {
    return this.http.get(url, this.options);
  }
}
