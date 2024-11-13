import { HttpInterceptorFn } from '@angular/common/http';

export const authinterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone the request and add the Authorization header if needed
  const token = localStorage.getItem('jwtToken'); // Example of retrieving a token
  console.log('Token retrived',token);
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest);
  }
  return next(req);
};