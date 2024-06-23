import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup = new FormGroup({});
  loginError: string = '';
  constructor(private firebaseAuth: FirebaseAuthService, private router: Router, private fb: FormBuilder) { }  

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login form:', this.loginForm.value);

      this.firebaseAuth.login(this.loginForm.value.email, this.loginForm.value.password)
      .then((data) => {
        console.log("login success", data);
        this.loginError= '';
        this.router.navigate(['/home']);
        localStorage.setItem('isLoggedIn', 'true');
      })
      .catch(error => {
        console.log(error.code)
        this.loginError= this.getErrorMessage(error.code);
      });   
    }
  }

  getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/user-disabled':
        return 'This user has been disabled.';
      case 'auth/user-not-found':
        return 'User not found.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/email-already-in-use':
        return 'This email is already in use.';
      case 'auth/weak-password':
        return 'The password is too weak.';
      case 'auth/invalid-credential':
        return 'Invalid credentials.';
      default:
        return 'An unknown error occurred. Please try again.';
    }
  }
}
