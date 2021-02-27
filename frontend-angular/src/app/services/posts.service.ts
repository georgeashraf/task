import { Injectable } from '@angular/core';
import { Post, PostsAdapter } from '../models/Post';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  token: string;
  time: number;
  role: string;
  leaves_url: string;
  user_role:string
  constructor(private http: HttpClient, private adapter: PostsAdapter, private authService: AuthService) { }
  employee_posts = '/index/employee_leave';
  managers_posts = '/index/manager_leave';
  deleteurl = '/index/delete_leave';
  submiturl = '/index/leave';
  managersurl = '/index/managers'
  accepturl = '/index/manager_accept'
  
  
  getPosts(): Observable<Post[]> {
    this.token = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('auth-token', this.token);
    this.user_role=localStorage.getItem('role')
    this.leaves_url=(this.user_role=='employee') ? this.employee_posts : this.managers_posts
    console.log(this.leaves_url)
    return this.http.get(this.leaves_url, { headers }).pipe(
      map((data: any) => data.leaves_arr.map(item => this.adapter.adapt(item)))
    );

  }



  getManagers(): Observable<any[]> {
    this.token = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('auth-token', this.token);

    return this.http.get<any>(this.managersurl, { headers }).pipe(
      map((data: any) => data.managers_arr)
    );

  }

  deletePost(postbody): Observable<any> {
    console.log(postbody)
    this.token = this.authService.getToken();
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-token': this.token
      }),
      body: postbody,
    };

    return this.http.delete(this.deleteurl, options);
  }

  submitPost(postbody): Observable<any>{
    this.token = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('auth-token', this.token);

    return this.http.post(this.submiturl, postbody, { headers });
  }

  acceptLeave(postbody) : Observable<any>{
    this.token = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('auth-token', this.token);

    return this.http.put(this.accepturl, postbody, { headers });
  }
}
