import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export enum MESSAGE_STATUS {
  NOT_SENT,
  SENT_SUCCESS,
  SENT_FAILED
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private httpClient: HttpClient) { }

  messageStatus: MESSAGE_STATUS = MESSAGE_STATUS.NOT_SENT;

  submitMessage(messagebody: any) {
    console.log(messagebody);
    this.httpClient.post('http://localhost:3000/contact', messagebody).subscribe({
      next: (data) => {
        console.log(data);
        this.messageStatus = MESSAGE_STATUS.SENT_SUCCESS;
      }, 
      error: (error) => {
        console.error(error)
        this.messageStatus = MESSAGE_STATUS.SENT_FAILED;
      }});
  }
}