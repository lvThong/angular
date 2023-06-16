import { Component, OnInit } from "@angular/core";
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup } from "@angular/forms";
import { TokenStorageService } from "../services/token-storage.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  options = [
    { value: 1, label: 'Admin' },
    { value: 2, label: 'Manger' },
    { value: 3, label: 'User' }
  ];
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];
  registerForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    fullName: new FormControl(),
    phoneNumber: new FormControl(),
    address: new FormControl(),
    role: new FormControl(),


  });

 
  // selectOption = null;
  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {

  }

  ngOnInit(): void {

   
  }

  onSubmit(): void {
    const { email, password, fullName, phoneNumber, address, role } = this.registerForm.value;
    this.authService.register(email, password, fullName, phoneNumber, address, role).subscribe(
      data => {
        if (data.status === 'success') {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          console.log(data);
          this.tokenStorage.saveToken(data.data.access_token);
          this.tokenStorage.saveUser(data.data.user);
          // this.roles = this.tokenStorage.getUser().roles;
          this.router.navigate(['/']);
  
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}

