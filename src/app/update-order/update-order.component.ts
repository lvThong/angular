import { Component, Input } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss']
})
export class UpdateOrderComponent {

  order: any;
  orderDetail: any;
  listProduct: any;
  inforCustomer: any;
  total: any;
  status: any;
  inforOrder: any;
  staff: any;
  users: any;
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
  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }
  ngOnInit() {
    let data: any = this.route.snapshot.paramMap.get('id');
    let id = JSON.parse(data);
   
    this.orderDetail = this.orderService.getDetailOrder({order_id: id}).subscribe(
      res => {
        if (res.status === 'success') {
        
          this.orderDetail = res.data;
          this.listProduct = this.orderDetail.list_products;
          this.inforCustomer = this.orderDetail.information_customer;
          this.inforOrder = this.orderDetail.information_order;
          this.staff = this.orderDetail.information_staff;
          this.status = this.orderDetail.status;
          this.total = this.orderDetail.total_price;
          console.log('f1 '+ this.inforOrder);
        }
      }
    );
    console.log(this.total);
    console.log(this.status);
    console.log(this.inforOrder);
    this.createForm();
  }
  findUserByPhoneNumber() {
    let params = {};
    this.userService.listUser(params).subscribe(
      res =>  {

      }
    );

    
  }
  createForm() {
   this.updateOrderForm =  this.formBuilder.group({
    orderName: this.inforOrder,
    status: 1
   });
  }

}
