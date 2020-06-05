import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ObservablesService } from 'src/app/services/observable/observable.service';


@Component({
  selector: 'app-search-source-form',
  templateUrl: './search-source-form.component.html',
  styles: [
  ]
})
export class SearchSourceFormComponent implements OnInit {

  // Declarations
  public formData: FormGroup;
  @Output() formSubmit = new EventEmitter();
  newsSources: object;
  newsList: object;

  constructor(private FormBuilder: FormBuilder, private ObservablesService: ObservablesService) {
    // Get news sources data from observer
    this.ObservablesService.getObservableData('sources').subscribe(observerNewsSourcesData => {
      if (observerNewsSourcesData === null) {
        this.newsSources = null;
      } else {
        if (observerNewsSourcesData) {
          this.newsSources = observerNewsSourcesData;
        } else {
          this.newsSources = null;
        }
      }
    });
  }

  private resetForm = () => {
    this.formData = this.FormBuilder.group({
      source: [null, Validators.required],
      keyword: [null, Validators.required],
    });
  };

  ngOnInit() {
    this.resetForm();
  }

}
