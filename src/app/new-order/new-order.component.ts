import { Component, ViewChild,ElementRef } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TokenStorageService} from "../services/token-storage.service";
import { ListProductCustomerComponent } from '../list-product-customer/list-product-customer.component';
import { OrderService } from '../services/order.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent {

  orderForm: any;
  submitted: boolean = false;
  user: any;
  listProduct: any;
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
  @ViewChild(ListProductCustomerComponent) child!: any;
  constructor(
    private formBuilder: FormBuilder,
    private sessionService: TokenStorageService,
    private orderService: OrderService,
    private notifi: NotificationService,
    private router: Router
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
  createOrder() {
    let {email, fullName, address, phoneNumber, orderName, status} = this.orderForm.value;
    let products = this.child.getData();
    let params = {
      email, fullName, address, phoneNumber, name: orderName, status, products: JSON.stringify(products)
    }

    this.orderService.createOrder(params).subscribe(
      res => {
        if (res.status === 'success') {
          this.router.navigate(['/order']);
          this.notifi.showSuccess('success', 'create new order');
        }
      }
    )
    
  }
}
