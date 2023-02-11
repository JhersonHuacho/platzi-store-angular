import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = `${environment.API_URL}/api/auth`;

  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  login(email: string, password: string) {
    return this.httpClient.post<Auth>(`${this.apiUrl}/login`, {
      email, password
    }).pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  getProfile() {
    //let headers = new HttpHeaders();
    //headers = headers.set('Authorization', `Bearer ${token}`);

    //return this.httpClient.get<User>(`${this.apiUrl}/profile`, { headers });
    return this.httpClient.get<User>(`${this.apiUrl}/profile`)
      .pipe(
        tap(user => this.user.next(user))
      );
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
      .pipe(
        switchMap(() => this.getProfile())
      )
  }

  logout() {
    this.tokenService.removeToken();
  }

}
