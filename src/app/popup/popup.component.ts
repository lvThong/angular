import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../services/notification.service';

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
  ) { }
  ngOnInit() {
    this.getRole();
    this.createForm();
    console.log('data :',this.data);
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
  f() {
    return this.userForm.controls;
  }
  updateUser() {
 
  }
  createUser() {

  }
  handleCancel() {

  }
}
