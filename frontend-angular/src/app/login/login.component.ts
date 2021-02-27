import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,
              private cookie: CookieService, private router: Router) { }

  public email: string;
  public password: string;
  public loginmessage: string;
  alert=false;
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ])
    
   });
  ngOnInit() {
  }

  onLogin() {
    // call auth service
    this.auth.userLogin(this.form.value)
    .subscribe(
      res => {
      
          this.cookie.set('token', res.token);
          localStorage.setItem('role', res.role);
           (res.role==='employee') ? this.router.navigate(['/posts']):this.router.navigate(['/accept'])
        
       
        
      },
      err => {
        this.loginmessage = err.error.msg
        this.alert = true;
        setTimeout(function() {
          this.alert = false;
        }.bind(this), 3000);
      }
    );
      }

}

