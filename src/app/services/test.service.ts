import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  // private url: string = environment.testUrl;
  constructor(private http: HttpClient) {}

  public srtudentDetails() {
    return this.http.get(`http://localhost:8080/students`);
  }

  public sentStudentData(data: any) {
    return this.http.post(`http://localhost:8080/students`, data);
  }

  public updateStudentData(data: any, rno: number) {
    return this.http.patch(`http://localhost:8080/students/${rno}`, data);
  }

  public deleteStudentDetails(rno: number) {
    return this.http.delete(`http://localhost:8080/students/${rno}`);
  }
}
