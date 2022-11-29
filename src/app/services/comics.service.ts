import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {
  constructor(private httpClient: HttpClient) { }

  getImage(url: string): Observable<Blob> {
    return this.httpClient.get(url, { responseType: 'blob' });
  }

  getImageAltText(url: string): Observable<object> {
    return this.httpClient.get(url);
  }

  getIssuesData(): Observable<object> {
    return this.httpClient.get(`${environment.apiUrl}/comics/`);
  }
  
}
