import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../core/services/http.service';

@Injectable()
export class AuthService {
  constructor(private http: HttpService) {}

  login(payload: any): Observable<any> {
    return this.http.post<any, any>(`auth/login`, payload);
  }

  register(payload: any): Observable<any> {
    return this.http.post<any, any>(`auth/sing-up`, {
      ...payload,
      photoUrl: 'http://image.com',
    });
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post<any, any>(`auth/reset-password/${email}`, {});
  }

  changePassword(payload: any): Observable<any> {
    return this.http.post<any, any>(`auth/change-password`, payload);
  }
}
