
// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//
import { ObservablesService } from "../observable/observable.service";

import { environment } from '../../../environments/environment';


/*
Definition
*/
@Injectable()

export class CrudService {

  constructor(
    private HttpClient: HttpClient,
    private ObservablesService: ObservablesService
  ){};


  /*
  Methods to get API responses
  */
  // Get the API response
  private getData = (endpoint, apiResponse: any) => {
    // Switch endpoint to set observable value
    switch(endpoint){
      default:
      // Retun data anytime
      return apiResponse || {};
      break;


      case 'users':
      // Set user info obserrbale value
      this.ObservablesService.setObservableData('user',apiResponse)

      // Return data
      return apiResponse || {};
      break;

      case 'sources':
      // Set source info obserrbale value
      this.ObservablesService.setObservableData('sources', apiResponse.sources);
      // Return data
      return apiResponse || {};
      break;
      case 'news':
      // Set news observable value
      this.ObservablesService.setObservableData('news', apiResponse);

      // Return data
      return apiResponse || {};
      break;
      
      case 'bookmark':
      // Return data
      return apiResponse || {};
      break;



    };
  };

  // Get the API error
  private setHeaders = () => {
    const myHeader = new HttpHeaders();
    myHeader.append('Content-Type', 'application/json');

    // return header
    return { headers: myHeader };
  };

  private handleError = (apiError: any) => Promise.reject(apiError.error);
  //

  //

  // CRUD method: read item
  public readOneItem(endpoint: string, param: string): Promise<any> {
    return this.HttpClient.get(`${environment.newsApiUrl}/${endpoint}?${param}`)
    .toPromise()
    .then(data => this.getData(endpoint, data))
    .catch(this.handleError);
  }

  // CRUD method: read all items : source
  public readAllItems(endpoint: string, param1: string = 'language=en', param2?: string): Promise<any> {
    return this.HttpClient.get(`${environment.newsApiUrl}/${endpoint}?${param1}&${param2}&apiKey=${environment.newsApiKey}`)
    .toPromise()
    .then(data => this.getData(endpoint, data))
    .catch(this.handleError);
  };

  // CRUD method: get all source
  public getAllSources(): Promise<any>{
    return this.HttpClient.get(`${environment.newsApiUrl}/sources?apiKey=${environment.newsApiKey}`)
    .toPromise()
    .then( data => this.getData('source', data))
    .catch(this.handleError);
  };

  // CRUD method: add bookmark
  public addBookmark(source: any): Promise<any> {
    return this.HttpClient.post(`${environment.authApiUrl}/bookmark`, source)
    .toPromise()
    .then(data => this.getData('bookmark', data))
    .catch(this.handleError);
  }




  // CRUD method: create item
  // public createItem(endpoint: String, data: any): Promise<any>{
  //   // Set header
  //   let myHeader = new HttpHeaders();
  //   myHeader.append('Content-Type', 'application/json');
  //
  //   // Launch request
  //   return this.HttpClient.post(`https://jsonplaceholder.typicode.com/posts`, data, { headers: myHeader })
  //   .toPromise().then( data => this.getData(endpoint, data)).catch(this.handleError);
  // };
  //
  // // CRUD method: edit an item
  // public updateItem(endpoint: String, _id: String, data: any): Promise<any>{
  //   // Set header
  //   let myHeader = new HttpHeaders();
  //   myHeader.append('Content-Type', 'application/json');
  //
  //   // Launch request
  //   return this.HttpClient.put(`https://jsonplaceholder.typicode.com/posts/${_id}`, data, { headers: myHeader })
  //   .toPromise().then( data => this.getData(endpoint, data)).catch(this.handleError);
  // };
  //
  // // CRUD method: delete an item
  // public deleteItem(endpoint: String, _id: String): Promise<any>{
  //   // Set header
  //   let myHeader = new HttpHeaders();
  //   myHeader.append('Content-Type', 'application/json');
  //
  //   // Launch request
  //   return this.HttpClient.delete(`https://jsonplaceholder.typicode.com/posts/${_id}`, { headers: myHeader })
  //   .toPromise().then( data => this.getData(endpoint, data)).catch(this.handleError);
  // };

};
