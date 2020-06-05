import { Component, OnInit } from '@angular/core';
import { ObservablesService } from "../../services/observable/observable.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  /*
  Declaration
  */
  // Properties
  public user: any;
  constructor(
    private ObservablesService: ObservablesService,
     private Router: Router
  ){
    // Get user data observer
    this.ObservablesService.getObservableData('user').subscribe(userDataObserver => {
      if (userDataObserver === null) {
        this.user = null;
      } else {
        if (userDataObserver) {
          // Update userData value
          this.user = userDataObserver;
        } else {
          this.user = null;
        }
      }
    })
  }
  //
  public logout = () => {

    // Delete localstorage
    localStorage.removeItem('token');
    localStorage.removeItem('bookmark');
    localStorage.removeItem('news');
    localStorage.removeItem('source');
    // Set user info obserrbale value
    this.ObservablesService.setObservableData('user', null);
    this.ObservablesService.setObservableData('token', null);
    this.ObservablesService.setObservableData('sources', null);
    this.ObservablesService.setObservableData('news', null);
    this.Router.navigateByUrl('/');
  }

  ngOnInit(){};

}
