import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (localStorage.getItem('isLoggedIn')) {
    return true;
  } else {
    return router.navigate(['/login-redirect']);
  }
};
