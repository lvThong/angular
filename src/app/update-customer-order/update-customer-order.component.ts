import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-customer-order',
  templateUrl: './update-customer-order.component.html',
  styleUrls: ['./update-customer-order.component.scss']
})
export class UpdateCustomerOrderComponent {
  customerForm: any;
  submitted: any;
  constructor(
    private formBuilder: FormBuilder,
    
  ){
  }
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.submitted = false;
    this.customerForm = this.formBuilder.group({
      email: [null,[Validators.email, Validators.required]],
      fullName: [null, [Validators.required, Validators.min(3)]],
      address: [null, Validators.required],
      phoneNumber: [null, Validators.required]
    });
  }
  get f() {
    return this.customerForm.controls;
  }
}
