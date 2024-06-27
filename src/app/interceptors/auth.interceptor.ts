import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { FirebaseAuthService } from '../services/firebase-auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // const authToken = localStorage.getItem('authToken');
  const token= inject(FirebaseAuthService)
  const authToken= "Your auth token";
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });
  return next(authReq);
};
