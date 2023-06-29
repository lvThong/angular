import { Component, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  // @ViewChild(PopupComponent) popupComponent: any;
  page: number = 1;
  limit: number = 5;
  count: number = 0;
  users: any;
  roles: any;
  filterForm: any;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
  
  }
  ngOnInit() {
    this.getRole();
    this.getListUser();
    this.createForm();
  }
  createForm() {
    this.filterForm = this.formBuilder.group({
      id: [null],
      name: [null],
      phoneNumber: [null],
      address: [null],
      role: [null]
  });
  }
  getListUser() {
  
    this.userService.listUser(this.page, this.limit).subscribe(
      res => {
          if (res.status === 'success') {
            this.users = res.data.data;
            this.count = res.data.total;
            
          }
      }
    )

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
  handlePage(event: any) {
    this.page = event;
    this.getListUser();
  }
  findUser() {

  }

  createUser() {
    const modalRef = this.modalService.open(PopupComponent,{ size: 'lg', backdrop: "static" });
    modalRef.componentInstance.title = 'Add New User';
    modalRef.result.then(
      result =>  {

      }, reason => {

      }
    )
  }
  editUser(user: any) {
    const modalRef = this.modalService.open(PopupComponent,{ size: 'lg', backdrop: "static" });
    modalRef.componentInstance.title = 'Edit User';
    modalRef.componentInstance.data = user;
    console.log(123);
    modalRef.result.then(
      result =>  {

      }, reason => {

      }
    )

  }
  deleteUser(id: number) {

  }
  
  
}
