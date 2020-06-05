/* IMPORTS */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


/* DEFINITION & EXPORT */
@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styles: []
})
export class RegisterFormComponent implements OnInit {

    // Declarations
    public formData: FormGroup;
    @Output() formSubmit = new EventEmitter();

    // Inject FormBuilder
    constructor(private FormBuilder: FormBuilder) { }

    // Method to reset form
    private resetForm = () => {
        this.formData = this.FormBuilder.group({
            email: [null, Validators.required],
            password: [null, Validators.required],
            firstname: [null, Validators.required],
            lastname: [null, Validators.required]
        });
    };

    // Start
    ngOnInit() {
        this.resetForm();
    }

}
