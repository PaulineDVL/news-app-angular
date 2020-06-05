/*
Import
*/
    // Angular
    import { Component, OnInit, Input } from '@angular/core';
    import { ObservablesService } from '../../services/observable/observable.service';

//

/*
Componant configuration
*/
    @Component({
        selector: 'app-item-post',
        templateUrl: './item-post.component.html'
    })
//


/*
Componant class definition
*/
    export class ItemPostComponent implements OnInit {

        // Input  data from parent component
        @Input() news: any;


        constructor(private ObservablesService: ObservablesService)
        {}
        ngOnInit(){};
    };
//
