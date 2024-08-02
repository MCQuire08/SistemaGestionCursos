import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api/course';

  constructor(private http:HttpClient) { }

  getCourses():Observable<any>{
    const idUser = localStorage.getItem('idUser');
    const token = localStorage.getItem('token');

    if (!idUser || !token) {
      return new Observable<any>();
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/`, { headers });
  }
}
