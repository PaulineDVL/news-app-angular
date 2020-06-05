import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CrudService } from '../../services/crud/crud.service';
import { ObservablesService } from '../../services/observable/observable.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-bookmark-page',
  templateUrl: './bookmark-page.component.html',
  styles: [
  ]
})
export class BookmarkPageComponent implements OnInit {

  bookmark: any = [];
  sourcesList: object;

  constructor(
    private AuthService: AuthService,
    private CrudService: CrudService,
    private ObservablesService: ObservablesService) {

      this.ObservablesService.getObservableData('bookmark').subscribe(observerBookmarkData => {
        if (observerBookmarkData === null) {
          // if nothing in observable (after reload for example), fall back to cache
          if (localStorage.getItem('bookmark')) {
            this.bookmark = JSON.parse(localStorage.getItem('bookmark'));
          } else {
            this.bookmark = null;
          }
        } else {
          if (observerBookmarkData) {
            // set local storage
            if (!localStorage.getItem('bookmark')) {
              localStorage.setItem('bookmark', JSON.stringify(observerBookmarkData));
            }
            // update bookmark value
            this.bookmark = observerBookmarkData;
          } else {
            this.bookmark = null;
          }
        }
      });

      this.ObservablesService.getObservableData('source').subscribe(observerSourceData => {
        if (observerSourceData === null) {

          // if nothing in observable (after reload for example), fall back to cache
          if (localStorage.getItem('source')) {
            this.sourcesList = JSON.parse(localStorage.getItem('source'));
          } else {
            this.sourcesList = null;
            console.log('Je suis la');
          }
        } else {
          if (observerSourceData) {

            // update source value
            this.sourcesList = observerSourceData;
          } else {
            this.sourcesList = null;
          }
        }
      });

    }

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


    ngOnInit(): void {
      // get all sources on page load
      if (localStorage.getItem('sources')) {
        this.sourcesList = JSON.parse(localStorage.getItem('sources'));
        this.ObservablesService.setObservableData('sources', JSON.parse(localStorage.getItem('sources')));
      } else {
        this.getAllSources();
      }
      
    }

  }
