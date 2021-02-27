import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  islogged: boolean;
  subscription: any;
  navigationSubscription;
  constructor(private router: Router, private authservice: AuthService ) {
    // this.isAuth = authservice.isAuth;
    // this.subscription = authservice.authChange.subscribe((value) => {
    //   this.isAuth = value;
    // });
    this.islogged = authservice.isLoggedIn();
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
   }
   initialiseInvites() {
    // Set default values
    this.islogged =this. authservice.isLoggedIn();
    console.log('reloaded');
  }


  ngOnInit() {
  }

  logout() {
    this.authservice.userLogout();
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {  
       this.navigationSubscription.unsubscribe();
    }
  }
}
