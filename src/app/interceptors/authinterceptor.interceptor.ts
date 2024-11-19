import { HttpInterceptorFn } from '@angular/common/http';

export const authinterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone the request and add the Authorization header if needed
  const userToken = localStorage.getItem('jwtToken'); // Example of retrieving a token
  const adminToken = localStorage.getItem('adminToken');  // Token for admin user

  console.log('Token retrived',userToken);
  console.log('Admin Token:', adminToken);

  const token= adminToken || userToken

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