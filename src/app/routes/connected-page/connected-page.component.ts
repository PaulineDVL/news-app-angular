import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { CrudService } from '../../services/crud/crud.service';
import { ObservablesService } from '../../services/observable/observable.service';


@Component({
  selector: 'app-connected-page',
  templateUrl: './connected-page.component.html',
  styleUrls: ['./connected-page.component.scss']
})


export class ConnectedPageComponent implements OnInit {
  /*
  Declarations
  */
  newsList: object;
  sourcesList: object;


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

  public getAllSources = async () => {
      const response = await this.CrudService.getAllSources();
      this.sourcesList = response.sources;
  };


  // LIFECYCLE HOOKS
  ngOnInit() {
      // get all sources on page load
      if (localStorage.getItem('sources')) {
              this.sourcesList = JSON.parse(localStorage.getItem('sources'));
              this.ObservablesService.setObservableData('sources', JSON.parse(localStorage.getItem('sources')));
          } else {
              this.getAllSources();
          }

          // get news from local storage
          if (localStorage.getItem('news')) {
              this.newsList = JSON.parse(localStorage.getItem('news'));
          }
  }
};
