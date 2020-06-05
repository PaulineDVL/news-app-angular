import { Component, OnInit, Input } from '@angular/core';
import { ObservablesService } from '../../services/observable/observable.service';


@Component({
  selector: 'app-item-source',
  templateUrl: './item-source.component.html',
  styles: [
  ]
})
export class ItemSourceComponent implements OnInit {

  // Input  data from parent component
  @Input() sources: any;


  constructor(private ObservablesService: ObservablesService)
  {}

  ngOnInit(): void {
  }

}
