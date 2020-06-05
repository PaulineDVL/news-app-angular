/*
Import
*/
// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Inner
import { AuthService } from "./services/auth/auth.service";

//

/*
Componant configuration
*/
@Component({
  selector: 'app-root',
  template: `
  <app-header></app-header>
  <router-outlet></router-outlet>
  `
})
//


/*
Componant class definition
*/
export class AppComponent implements OnInit {

  constructor(
    private AuthService: AuthService,
    private Router: Router
  ){}

  async ngOnInit(){
    return new Promise((resolve, reject) => {
    this.AuthService.getCurrentUserInfo({ token: localStorage.getItem('token') })
        .then((apiResponse) => {
            if (apiResponse.message === 'User logged') {
                return resolve(this.Router.navigateByUrl('/connected'));
            }
        })
        .catch((apiError: any) => {
            Promise.reject(apiError.error);
            this.Router.navigateByUrl('/');
        });
});
  };
};
//
