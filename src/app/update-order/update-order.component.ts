import { Component, Input } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
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
          this.total = this.orderDetail.total_price;
        }
      }
    );

  }

}
