import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  page: number = 1;
  limit: number = 5;
  count: number = 0;
  users: any;
  roles: any;

  constructor() {

  }
  ngOnInit() {

  }
  createUser() {

  }
  editUser(user: any) {

  }
  deleteUser(id: number) {

  }
  handlePage(event: any) {

  }
  
}
