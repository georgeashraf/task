import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { LoginGuard } from './gaurds/login.gaurd';
import { AuthGuard } from './gaurds/auth.gaurd';
import { AcceptGaurd } from './gaurds/accept.gaurd';

import { HomeComponent } from './home/home.component';
import { AcceptComponent } from './accept/accept.component';


const routes: Routes = [
  {path: '', component: HomeComponent, runGuardsAndResolvers: 'always'},
  {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'posts', component: PostsComponent, canActivate: [AuthGuard]},
  {path: 'accept', component: AcceptComponent, canActivate: [AcceptGaurd]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//update the posts component to get employee leaves