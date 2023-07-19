import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
  id: any;
  listProducts: any;
  inforUser: any;
  inforCustomer: any;
  inforOrder: any;
  created_at: any;
  total: any;
  title: any;
  status: any;
  orderName: any;
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
    private orderService: OrderService,
    protected activeModal: NgbActiveModal
  ) {}
  ngOnInit() {
    this.getDetailOrder();
  }
  getDetailOrder() {
    this.orderService.getDetailOrder({order_id: this.id}).subscribe(
      res => {
          if(res.status === 'success') {
           
            this.listProducts = res.data.list_products;
            this.inforCustomer = res.data.information_customer;
            this.inforUser = res.data.information_staff;
            this.inforOrder = res.data.information_order;
            this.total = res.data.total_price;
            this.status = res.data.status;
            this.created_at = this.inforOrder.created_at;
            this.orderName = this.inforOrder.name;
          }
      }
    )
  }
}
