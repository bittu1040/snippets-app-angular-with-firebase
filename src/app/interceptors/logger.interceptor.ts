import { HttpInterceptorFn } from '@angular/common/http';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`Requesting: ${req.method} ${req.urlWithParams}`);
  return next(req);
};
