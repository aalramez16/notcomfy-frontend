import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {
  constructor(private httpClient: HttpClient) { }

  getImage(url: string): Observable<Blob> {
    return this.httpClient.get(url, { responseType: 'blob' });
  }

  getIssuesData(): Observable<object> {
    return this.httpClient.get('http://localhost:3000/comics/');
  }
  
}
