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
      // Simulate login logic (replace with actual authentication)
      this.firebaseAuth.register(this.signupForm.value.email, this.signupForm.value.password)
      .then((data) => {
        console.log("register success", data)
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.log(error)
      });
      // Reset form after successful submission (optional)
      this.signupForm.reset();
    }
  }

}
