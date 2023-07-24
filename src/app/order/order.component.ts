import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  limit: number = 5;
  page: number = 1;
  count: number = 0;
  filterForm: any;
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
    },
    {
      name: 'Cancel',
      value: 5
    },

  ];
  orders: any;


  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private modalService: NgbModal,
    private notifi: NotificationService,
    private router: Router
  ) { }
  ngOnInit() {
    this.getListOrder();
    this.createForm();
  }
  getListOrder() {
    let params = {
      page: this.page,
      limit: this.limit
    };
    this.orderService.getListDetailOrder(params).subscribe(
      res => {
        if (res.status === 'success') {
          this.orders = res.data.data;
          this.count = res.data.total;
          console.log(this.orders);
        }
      }
    )
  }
  createForm() {
    this.filterForm = this.formBuilder.group(
      {
        id: null,
        name: null,
        status: null,
        userName: null,
        customerName: null,
        customerAddress: null,
        customerPhoneNumber: null,
        customerEmail: null
      }
    );
  }
  convertStringStatus(options: any, value: any) {
    let option = options.filter((item: any) => {
      return item.value === value;
    });
    return option[0].name;
  }
  editOrder(order: any) {
    this.router.navigate(['update-order', { id: JSON.stringify(order.id) }]);
  }
  deleteOrder(id: number) {
    this.orderService.deleteOrder(id).subscribe(
      res => {
        if (res.status === 'success') {
          this.notifi.showSuccess('success', 'Deleted order');
        } else {
          this.notifi.showError('error', 'No delete order')
        }
        this.getListOrder();
      }
    )
  }
  findOrder() {
    let { id, name, status, customerName, customerAddress, customerEmail, customerPhoneNumber } = this.filterForm.value;
    let params = {
      orderId: id, name, status,
      fullName: customerName, email: customerEmail, address: customerAddress, phoneNumber: customerPhoneNumber
    };

    this.orderService.getListDetailOrder(params).subscribe(
      res => {
        if (res.status === 'success') {
          this.orders = res.data.data;
          this.count = res.data.total;
        }
      }
    )
  }
  createOrder() {
    this.router.navigate(['create-order']);
  }
  handlePage(event: any) {
    this.page = event;
    this.getListOrder();
  }
  displayOrder(id: any) {
    let modalRef = this.modalService.open(OrderDetailComponent, { size: 'lg', backdrop: "static" });
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.title = 'ORDER';

    modalRef.result.then(
      result => { },
      reason => { }
    );

  }
}
