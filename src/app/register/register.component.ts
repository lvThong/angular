import { Component, OnInit } from "@angular/core";
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TokenStorageService } from "../services/token-storage.service";
import { Router } from '@angular/router';
import { NotificationService } from "../services/notification.service";
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
  registerForm: any;
  submitted: boolean = false;


  // selectOption = null;
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private tokenStorage: TokenStorageService,
    private notifi: NotificationService
    ) {

  }

  ngOnInit(): void {
    this.createForm();

  }
  createForm(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      fullName: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      role: new FormControl(null, [Validators.required]),


    });
  }
  onSubmit() {
    this.submitted = true;
    const { email, password, fullName, phoneNumber, address, role } = this.registerForm.value;
    if(this.registerForm.invalid) {
    
      return;
    }
    this.authService.register(email, password, fullName, phoneNumber, address, role).subscribe(
      res => {
        if (res.status === 'success') {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
    
          this.tokenStorage.saveToken(res.data.access_token);
          this.tokenStorage.saveUser(res.data.user);
          // this.roles = this.tokenStorage.getUser().roles;
          this.router.navigate(['/']);
            // this.notifi.showSuccess('Success', 'Logged in');
        } else {
          alert(res.message);
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
} 

