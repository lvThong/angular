import {Component, Input} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-update-customer-order',
  templateUrl: './update-customer-order.component.html',
  styleUrls: ['./update-customer-order.component.scss']
})
export class UpdateCustomerOrderComponent {
  inforCustomerValue: any;

  @Input()
  get inforCustomer() {
    return this.inforCustomerValue;
  }

  set inforCustomer(value: any) {
    this.inforCustomerValue = value;

    if (value) {
      this.setValueForm();
    }
  };

  customerForm: any;
  submitted: any;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  setValueForm() {
    this.customerForm.setValue({
      email: this.inforCustomer.email,
      fullName: this.inforCustomer.fullName,
      address: this.inforCustomer.address,
      phoneNumber: this.inforCustomer.phoneNumber
    });
  }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.submitted = false;
    this.customerForm = this.formBuilder.group({
      email: [null, [Validators.email, Validators.required]],
      fullName: [null, [Validators.required, Validators.min(3)]],
      address: [null, Validators.required],
      phoneNumber: [null, Validators.required]
    });
  }

  get f() {
    return this.customerForm.controls;
  }
  getDataComponent() {
    return this.customerForm.value;
  }
  updateCustomer() {
    let {email, fullName, phoneNumber, address} = this.customerForm.value;
    this.customerService.updateCustomer(this.inforCustomer.id, email, fullName, address, phoneNumber).subscribe(
      res => {
        if (res.status === 'success') {

        }
      }
    )
  }
}
