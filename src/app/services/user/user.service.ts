import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/user/auth/AuthResponse';
import { SignupUserRequest } from 'src/app/models/interfaces/user/signup-user-request';
import { SignupUserResponse } from 'src/app/models/interfaces/user/signup-user-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  signupUser(requestData: SignupUserRequest): Observable<SignupUserResponse> {
    return this.http.post<SignupUserResponse>(`${this.API_URL}/users`, requestData);

  }

  authenticateUser(requestData: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`, requestData);

  }
}
