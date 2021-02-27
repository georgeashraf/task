import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginurl = '/auth/login';
  private registerurl = '/auth/register';
  public isAuth: boolean;
  
  authChange: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) { }
  userRegister(user) {
    
    return this.http.post<any>(this.registerurl, user);
  }
  userLogin(user) {
    this.isAuth = true;
    this.authChange.next(this.isAuth);
    return this.http.post<any>(this.loginurl, user);
  }

  isLoggedIn() {
    if (this.cookie.get('token')) {
      return true;
    } else {
      return false;
    }
  }

  isManager() {
    if (localStorage.getItem('role')==='manager') {
      return true;
    } else {
      return false;
    }
  }

  getToken() {
    return this.cookie.get('token');
  }

  userLogout() {
    this.isAuth = false;
    this.authChange.next(this.isAuth);
    this.cookie.delete('token');
    localStorage.removeItem("role");
    this.router.navigate(['/']);
  }

  authcheck(){
    this.authChange.next(this.isAuth);
  }
}
