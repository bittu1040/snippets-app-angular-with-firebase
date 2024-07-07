import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const firebaseAuth = inject(FirebaseAuthService);

  if (localStorage.getItem('isLoggedIn') && state.url==='/login') {
    firebaseAuth.isLoggedInSubject.next(true);
    router.navigate(['/home']);
    return true;
  } else if(!localStorage.getItem('isLoggedIn') && state.url==='/login') {
    return true;
  }
  else if(localStorage.getItem('isLoggedIn') && state.url==='/upload-snippets') {
  return true;
  }
  else{
    firebaseAuth.isLoggedInSubject.next(false);
    return router.navigate(['/login-redirect']);
  }
};
