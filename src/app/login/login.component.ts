import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
// import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  submitted: boolean = false;
  formLogin: any;
  roles: string[] = [];

  constructor(
    private authService: AuthService, 
    private tokenStorage: TokenStorageService, 
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.createForm();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

  }
  createForm() {
    this.formLogin = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(5)]],
    });
    // this.formLogin = new FormGroup({
    //   username: new FormControl(null, [Validators.required, Validators.max(10), Validators.min(3)]),
    //   password: new FormControl(null, [Validators.required, Validators.min(3), Validators.max(10)]),
    // });
  }
  onSubmit(): void {
    this.submitted = true;
    if(this.formLogin.invalid) {
      return ;
    }
    const { username, password } = this.formLogin.value;
    
    this.authService.login(username , password).subscribe(
      res => {
        if (res.status === 'success') {
          this.tokenStorage.saveToken(res.data.access_token);
          this.tokenStorage.saveUser(res.data.user);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          // this.reloadPage();
          this.router.navigate(['/']);
          
        } else {
          alert(res.message);
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}