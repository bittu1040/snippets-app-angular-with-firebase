import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup = new FormGroup({});
  constructor(private firebaseAuth: FirebaseAuthService, private router: Router, private fb: FormBuilder) { }  

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Email:', this.loginForm.value.email);
      console.log('Password:', this.loginForm.value.password);
      // Simulate login logic (replace with actual authentication)
      this.firebaseAuth.login(this.loginForm.value.email, this.loginForm.value.password)
      .then((data) => {
        console.log("login success", data)
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.log(error)
      });
      alert('Login successful!');
      // Reset form after successful submission (optional)
      this.loginForm.reset();
    }
  }
}
