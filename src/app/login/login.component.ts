import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
// import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  formLogin = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {
    
   }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    
  }

  onSubmit(): void {
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
          console.log('Thoong tin sai')
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