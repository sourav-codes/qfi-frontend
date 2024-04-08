// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../views/auth.service'; // Import your AuthService

@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
 failedAttempts = 0; // Counter for failed login attempts
 maxAttempts = 3; // Maximum number of failed attempts allowed
 loginDisabled = false; // Flag to disable the login button

 constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {}

 ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
 }

 login() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.loginUser(email, password).subscribe((success: any) => {
      if (success) {
        console.log(success)
        localStorage.setItem('authToken', success.tokens.access.token);
        localStorage.setItem('userDetails', success.user)
        this.router.navigate(['/']); // Navigate to root after successful login
      } else {
        this.failedAttempts++;
        if (this.failedAttempts >= this.maxAttempts) {
          this.loginDisabled = true; // Disable the login button after max attempts
          setTimeout(() => {
            this.failedAttempts = 0; // Reset failed attempts counter
            this.loginDisabled = false; // Enable the login button again
          }, 30000); // 30 seconds cooldown period
        }
      }
    },
    (error) => {
      console.error("Login error:", error);
      // Handle error
    });
 }
}
