import { Component } from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {FormBuilder} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NotificationService} from "../services/notification.service";
import {PopupComponent} from "../popup/popup.component";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  page: number = 1;
  limit: number = 5;
  count: number = 0;
  customers: any;
  roles: any;
  filterForm: any;
  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private notifi: NotificationService
  ) {

  }
  ngOnInit() {
    this.getListcustomer();
    this.createForm();
  }
  createForm() {
    this.filterForm = this.formBuilder.group({
      id: [null],
      name: [null],
      phoneNumber: [null],
      address: [null]
    });
  }
  getListcustomer() {
    let params = {
      page: this.page,
      limit: this.limit
    }
    this.customerService.listCustomer(params).subscribe(
      res => {
        if (res.status === 'success') {
          this.customers = res.data.data;
          this.count = res.data.total;
        }
      }
    )

  }
  handlePage(event: any) {
    this.page = event;
    this.getListcustomer();
  }
  findCustomer() {
    let { id, name, phoneNumber, address, role } = this.filterForm.value;
    let params = {
      page: this.page,
      limit: this.limit,
      id,
      name,
      phoneNumber,
      address,
      role
    }
    this.customerService.listCustomer(params).subscribe(
      res => {
        if (res.status === 'success') {
          this.customers = res.data.data;
          this.count = res.data.total;

        }
      }
    )
  }

  createCustomer() {
    const modalRef = this.modalService.open(PopupComponent, { size: 'lg', backdrop: "static" });
    modalRef.componentInstance.title = 'Add New Customer';
    modalRef.result.then(
      result => {

      }, reason => {

      }
    )
  }
  editCustomer(customer: any) {
    const modalRef = this.modalService.open(PopupComponent, { size: 'lg', backdrop: "static" });
    modalRef.componentInstance.title = 'Edit Customer';
    modalRef.componentInstance.data = customer;
    modalRef.result.then(
      result => {

      }, reason => {

      }
    )

  }
  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(
      res => {
        if (res.status === 'success') {
          this.notifi.showSuccess('success', 'deleted customer');
        } else {
          this.notifi.showError('failure', 'deleted customer');
        }
        this.getListcustomer();
      }
    )
  }
}
