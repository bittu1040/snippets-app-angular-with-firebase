import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup = new FormGroup({});
  signupError: string = '';

  constructor( private fb: FormBuilder, private firebaseAuth: FirebaseAuthService, private router: Router) { }

  ngOnInit(){
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Email:', this.signupForm.value.email);
      console.log('Password:', this.signupForm.value.password);
      this.firebaseAuth.register(this.signupForm.value.email, this.signupForm.value.password)
      .then((data) => {
        console.log("register success", data)
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.log(error);
        this.signupError = this.getErrorMessage(error.code);
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
