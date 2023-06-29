import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(
    private http: HttpClient
  ) { }

  uploadImage(formData: any) {
    return this.http.post(environment.baseUrl, formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      map((event: any) => this.getEventMessage(event, formData)),
      catchError(this.handleError)
    );
  }

  private getEventMessage(event: HttpEvent<any>, formData: any) {
    console.log('event :>> ', event);
    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);

      case HttpEventType.Response:
        return this.apiResponse(event);

      default:
        return `File "${formData.get('profileImage').profileImage}" surprising upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event: any) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { status: 'progress', message: percentDone }
  }

  private apiResponse(event: any) {
    return event.body;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened. Please try again later.');
  }
}
