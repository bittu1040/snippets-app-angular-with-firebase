import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const firebaseAuth = inject(FirebaseAuthService);

  if (localStorage.getItem('isLoggedIn')) {
    firebaseAuth.isLoggedIn.next(true);
    return true;
  } else {
    firebaseAuth.isLoggedIn.next(false);
    return router.navigate(['/login-redirect']);
  }
};
