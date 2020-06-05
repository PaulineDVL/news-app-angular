/* IMPORTS */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ObservablesService } from '../observable/observable.service';

import { UserModel } from '../../models/user.model';

import { environment } from '../../../environments/environment';


/* DEFINITION & EXPORT */
@Injectable( { providedIn: 'root' } )

export class AuthService {

    // DEPENDENCIES INJECTION
    constructor(
        private HttpClient: HttpClient,
        private ObservablesService: ObservablesService) { }


    // METHODS
    // request headers settings
    private setHeaders = () => {
        // set header
        const myHeader = new HttpHeaders();
        myHeader.append('Content-Type', 'application/json');

        // return header
        return { headers: myHeader };
    };

    // log in user
    public loginUser(credentials: string): Promise<any> {
        // make an HTTP POST call
        return this.HttpClient.post(`${environment.authApiUrl}/login`, credentials, this.setHeaders())
            .toPromise()
            .then(data => this.getData(data))
            .catch(this.handleError);
    }

    // register user
    public registerUser(user: UserModel): Promise<any> {
        // make an HTTP POST call
        return this.HttpClient.post(`${environment.authApiUrl}/register`, user, this.setHeaders())
            .toPromise()
            .then(data => this.getData(data))
            .catch(this.handleError);
    }

    // get user information
    public getCurrentUserInfo(token: object): Promise<any> {
        return this.HttpClient.post(`${environment.authApiUrl}/me`, token, this.setHeaders())
            .toPromise()
            .then((data) => this.getData(data))
            .catch(this.handleError);
    }

    // get api response
    private getData = (apiResponse: any) => {
        this.ObservablesService.setObservableData('user', apiResponse.data.user);
        this.ObservablesService.setObservableData('token', apiResponse.data.token);
        this.ObservablesService.setObservableData('bookmark', apiResponse.data.bookmark);

          localStorage.setItem('bookmark', JSON.stringify(apiResponse.data.bookmark));
        // Return data
        return apiResponse || {};
    };

    // handle api response error
    private handleError = (apiError: any) => Promise.reject(apiError.error);

}
