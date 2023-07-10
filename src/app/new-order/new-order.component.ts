import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TokenStorageService} from "../services/token-storage.service";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent {

  orderForm: any;
  submitted: boolean = false;
  user: any
  options = [
    {
      name: 'New Order',
      value: 1
    },
    {
      name: 'Spending Order',
      value: 2
    },
    {
      name: 'Ok Order',
      value: 3
    },
    {
      name: 'Delivery To Buyer',
      value: 4
    }
  ];
  constructor(
    private formBuilder: FormBuilder,
    private sessionService: TokenStorageService
  ){}

  ngOnInit() {
    this.getInformationUser();
    this.createForm();

  }
  getInformationUser() {
    this.user = this.sessionService.getUser();


  }
  createForm() {
    this.orderForm = this.formBuilder.group({
      email: [null,Validators.required],
      fullName: [null,Validators.required],
      address: [null,Validators.required],
      phoneNumber: [null,Validators.required],
      status: [null,Validators.required],
      orderName: [null,Validators.required],
    });
  }
  get f() {
    return this.orderForm.controls;
  }
  createOrder() {}

}
