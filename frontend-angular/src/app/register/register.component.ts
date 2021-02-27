import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registermessage: string;

  constructor(private auth: AuthService,private router: Router) { }

  public username: string;
  public email: string;
  public password: string;
  public role: string;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),

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

  onRegister() {
    const postbody = {
      name: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
      role: this.form.value.role,

    };
   
   this.auth.userRegister(postbody).subscribe(response => {
     
    this.registermessage = response.msg; 
    this.router.navigate(['/posts'])
  console.log(response.msg)});
  }

}
