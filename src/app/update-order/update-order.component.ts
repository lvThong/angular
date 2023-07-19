import { Component, Input, ViewChild } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UpdateCustomerOrderComponent } from '../update-customer-order/update-customer-order.component';
import { UpdateProductOrderComponent } from '../update-product-order/update-product-order.component';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss']
})
export class UpdateOrderComponent {

  order: any;

  listProduct: any;
  inforCustomer: any;

  total: any;
  status: any;

  staff: any;
  position: any;
  users: any;
  orderDetailValue: any;
  id: any;

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
  updateOrderForm: any;
  @ViewChild(UpdateCustomerOrderComponent) child1: any;
  @ViewChild(UpdateProductOrderComponent) child2: any;
  get orderDetail() {
    return this.orderDetailValue;
  }
  set orderDetail(value: any) {
    this.orderDetailValue = value;
    if (value) {
      this.setValueForm();
    }
  }
  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notifi: NotificationService
  ) { }
  ngOnInit() {
    let data: any = this.route.snapshot.paramMap.get('id');
    this.id = JSON.parse(data);

    this.getOrderDetail(this.id);
    this.createForm();
  }
  getOrderDetail(id: any) {
    this.orderService.getDetailOrder({ order_id: id }).subscribe(
      res => {
        if (res.status === 'success') {

          this.orderDetail = res.data;
          this.listProduct = this.orderDetail.list_products;
          this.inforCustomer = this.orderDetail.information_customer;
          // this.inforOrder = this.orderDetail.information_order;
          // this.staff = this.orderDetail.information_staff;
          // this.status = this.orderDetail.status;
          // this.total = this.orderDetail.total_price;
          // console.log(this.orderDetail.information_staff.name);
          this.staff = this.orderDetail.information_staff.name;
          this.position = this.orderDetail.information_staff.role.name;
        }
      }
    );
  }
  findUserByPhoneNumber() {
    let params = {};
    this.userService.listUser(params).subscribe(
      res => {

      }
    );


  }
  createForm() {
    this.updateOrderForm = this.formBuilder.group({
      orderName: null,
      status: null,
    });
  }
  setValueForm() {
    this.updateOrderForm.setValue({
      orderName: this.orderDetail.information_order.name,
      status: this.orderDetail.status,
    })
  }
  getValueForm() {
    return this.updateOrderForm.value.staff;
  }
  updateOrder() {
    let products = this.child2.getDataComponent();
    let { email, address, phoneNumber, fullName } = this.child1.getDataComponent();
    let params = {
      order_id: this.id, order_name: this.updateOrderForm.value.orderName, status: this.updateOrderForm.value.status,
       email, address, phoneNumber, fullName, products: JSON.stringify(products)

    };
    console.log(params);
    this.orderService.updateOrder(params).subscribe(
      res => {
        if (res.status === 'success') {
          this.router.navigate(['/order']);
          this.notifi.showSuccess('success', 'updated');
        } else {
          this.notifi.showError('error', 'no updated')
        }
      }
    )
  }
}
