import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';

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
  categories: any;
  listProduct: any;
  isVisible: boolean = false;
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
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }
  ngOnInit() {
    this.getListOrderInit();
    this.getAllCategory();
    this.createForm();
  }
  getAllCategory() {
    let params = {};
    this.categoryService.getListCategories(params).subscribe(
      res => {
        if (res.status === 'success') {
          this.categories = res.data.data;
        }
      }
    )
  }
  updateListProduct(event: any) {
    let categoryId = event.target.value;
    if (categoryId === 'null') {
      this.isVisible = false;
      return;
    }
    this.isVisible = true;
    this.productService.getListProductByCategory(categoryId).subscribe(
      res => {
        if (res.status === 'success') {
          this.listProduct = res.data.data;
        }
      }
    )

  }
  getListOrderInit() {
    let params = {
      page: this.page,
      limit: this.limit
    }
    this.orderService.getListDetailOrder(params).subscribe(
      res => {
        if (res.status === 'success') {

          let data = res.data.data;
          let result: any = [];
          // let keys = Object.keys(data);
          for (let index in data) {
            result = [...result, data[index][0]];
          }
          this.orders = result;
          this.count = res.data.total;
        }
      }
    )
  }
  getListOrder() {

    let { id, name, status, customerName, customerAddress, customerEmail, customerPhoneNumber, productId, userName } = this.filterForm.value;
    let params = {
      orderId: id, orderName: name, status,
      fullName: customerName, email: customerEmail, address: customerAddress, phoneNumber: customerPhoneNumber, userName,
      productId, page: this.page, limit: this.limit
    };

    this.orderService.getListDetailOrder(params).subscribe(
      res => {
        if (res.status === 'success') {

          let data = res.data.data;
          let result: any = [];
          // let keys = Object.keys(data);
          for (let index in data) {
            result = [...result, data[index][0]];
          } 
          if (data.length == 0) {
            this.orders = false;
            this.count = 0;
            // console.log(this.orders, this.count, this.page);
          } else {
            this.orders = result;
            this.count = res.data.total;
          }
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
        customerEmail: null,
        productName: null,
        categoryId: null,
        productId: null
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
    const modalRef = this.modalService.open(ModalDeleteComponent, { size: 'sm', backdrop: 'static'});
    modalRef.componentInstance.title = 'Delete this order';
    modalRef.result.then(
      result => {
        this.orderService.deleteOrder(id).subscribe(
          res => {
            if (res.status === 'success') {
              this.notifi.showSuccess('success', 'Deleted order');
    
              this.getListOrder();
            } else {
              this.notifi.showError('error', 'No delete order')
            }
    
          }
        )
      },
      reason => {

      }
    )
  }
  findOrder() {
    // let { id, name, status, customerName, customerAddress, customerEmail, customerPhoneNumber, productId, userName } = this.filterForm.value;
    // let params = {
    //   orderId: id, name, status,
    //   fullName: customerName, email: customerEmail, address: customerAddress, phoneNumber: customerPhoneNumber, productId, userName, page: this.page, limit: this.limit
    // };

    // this.orderService.getListDetailOrder(params).subscribe(
    //   res => {
    //     if (res.status === 'success') {
    //       let data = res.data.data;
    //       let result: any = [];

    //       const keys = Object.keys(data);
    //       for (let key of keys) {
    //         result = [...result, data[key][0]];
    //       }

    //       this.orders = result;
    //       this.count = res.data.total;
    //     }
    //   }
    // )
    this.getListOrder();
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
