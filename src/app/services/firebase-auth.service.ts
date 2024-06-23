import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {


  currentUser: any; // To store the currently logged-in user
  navButtons= new BehaviorSubject(false)

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
    });
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    return this.afAuth.signOut(); 
  }

  // isLoggedIn() {
  //   return this.currentUser !== null;
  // }
}
