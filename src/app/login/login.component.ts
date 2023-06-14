import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  LoginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    // console.log(this.LoginForm.value);
    const {username, password} = this.LoginForm.value;

  }

}
