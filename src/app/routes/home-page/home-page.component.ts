/* IMPORTS */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { CrudService } from '../../services/crud/crud.service';
import { ObservablesService } from '../../services/observable/observable.service';

import { UserModel } from '../../models/user.model';


/* DEFINITION & EXPORT */
@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {

    // PROPERTIES
    newsList: object;
    sourcesList: object;


    // DEPENDENCIES INJECTION
    constructor(
        private AuthService: AuthService,
        private Router: Router,
        private CrudService: CrudService,
        private ObservablesService: ObservablesService
    ) {
        if (localStorage.getItem('news')) {
            this.newsList = JSON.parse(localStorage.getItem('news'));
        }
    }


    // METHODS
    // login
    public loginUser = async (credentials: string) => {
        // get user info
        const userInfo = await this.AuthService.loginUser(credentials);
        localStorage.setItem('token', userInfo.data.token);

        // check user info
        if (userInfo) {
            this.Router.navigateByUrl('/connected');
        }
    };

    // registration
    public registerUser = async (user: UserModel) => {
        const userInfo = await this.AuthService.registerUser(user);

        // check user info
        if (userInfo) {
            this.Router.navigateByUrl('/connected');
        }
    };

    // get news from source
    public getNewsList = async (sourceSelectorFormData: any) => {
        let response;
        if (sourceSelectorFormData.keyword === null) {
            response = await this.CrudService.readAllItems('top-headlines', `sources=${sourceSelectorFormData.source}`);
        } else {
            response = await this.CrudService.readAllItems('top-headlines', `sources=${sourceSelectorFormData.source}`
          //  , `q=${sourceSelectorFormData.keyword}`
          );
            localStorage.setItem('last-keyword', sourceSelectorFormData.keyword);
        }
        this.newsList = response.articles;
         localStorage.setItem('news', JSON.stringify(response.articles));
         localStorage.setItem('last-source', sourceSelectorFormData.source);
    };

    //get all sources
    public getSourcesList = async () => {
        if (localStorage.getItem('sources')) {
            this.sourcesList = JSON.parse(localStorage.getItem('sources'));
            this.ObservablesService.setObservableData('sources', JSON.parse(localStorage.getItem('sources')));
        } else {
            const response = await this.CrudService.getAllSources();
            this.sourcesList = response.sources;
            this.ObservablesService.setObservableData('sources', response.sources);
            localStorage.setItem('sources', JSON.stringify(this.sourcesList));
        }
    };


    // LIFECYCLE HOOKS
    ngOnInit() {
        // get all sources on page load
       this.getSourcesList();
    }

}
