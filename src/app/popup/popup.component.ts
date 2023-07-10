import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../services/notification.service';
import {CustomerService} from "../services/customer.service";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {

  userForm: any;
  roles: any;
  @Input() data: any;
  @Input() title: any;
  submitted = false;
  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public activeModal: NgbActiveModal,
    public notification: NotificationService,
    public customerService: CustomerService
  ) { }
  ngOnInit() {
    this.getRole();
    this.createForm();
  }
  getRole() {
    this.userService.getRole().subscribe(
      res => {
        if (res.status === 'success') {
          this.roles = res.data;
        }
      }
    )
  }
  createForm() {
    this.userForm = this.formBuilder.group({
      id: [this.data ? this.data.id : null],
      email: [this.data ? this.data.email : null, Validators.required],
      password: [null, Validators.required],
      fullName: [this.data ? this.data.fullName : null, Validators.required],
      address: [this.data ? this.data.address : null, Validators.required],
      phoneNumber: [this.data ? this.data.phoneNumber : null, Validators.required],
      role: [this.data ? this.data.role : null, Validators.required],
    });
  }
  get f() {
    return this.userForm.controls;
  }
  updateUser() {
    this.submitted = true;
    let {id, email, fullName, address, phoneNumber, role} = this.userForm.value;
    if (this.userForm.invalid) {
      return;
    }
    this.userService.updateUser(id, email, fullName, address, phoneNumber, role).subscribe(
      res => {
        if (res.status === 'success') {
          this.activeModal.close(true);
          window.location.reload();
          this.notification.showSuccess('success','updaded data');


        } else {
          this.notification.showError('failure', 'update data');
        }

      }
    )
  }
  createUser() {
    this.submitted = true;
     let {email, password, fullName, address, phoneNumber, role} = this.userForm.value;
     if (this.userForm.invalid) {
      return;
    }
     this.userService.createUser(email, password, fullName, address, phoneNumber, role).subscribe(
      res => {
          if (res.status === 'success') {
            this.activeModal.close(true);
            window.location.reload();
            this.notification.showSuccess('success', 'created new user');
          } else {
            this.notification.showError('failure', 'create new user');
          }
      }
     )
  }
  handleCancel() {
    this.submitted = false;
    this.activeModal.close('Close click');
  }
  updateCustomer() {
    this.submitted = true;
    let {id, email, fullName, address, phoneNumber} = this.userForm.value;
    if (this.userForm.invalid) {
      return;
    }
    this.customerService.updatecCustomer(id, email, fullName, address, phoneNumber).subscribe(
      res => {
        if (res.status === 'success') {
          this.activeModal.close(true);
          window.location.reload();
          this.notification.showSuccess('success','updaded data');


        } else {
          this.notification.showError('failure', 'update data');
        }

      }
    )
  }
  createCustomer() {
    this.submitted = true;
    let {email, fullName, address, phoneNumber} = this.userForm.value;
    if (this.userForm.invalid) {
      return;
    }
    this.customerService.createCustomer(email, fullName, address, phoneNumber).subscribe(
      res => {
        if (res.status === 'success') {
          this.activeModal.close(true);
          window.location.reload();
          this.notification.showSuccess('success', 'created new user');
        } else {
          this.notification.showError('failure', 'create new user');
        }
      }
    )
  }

}
