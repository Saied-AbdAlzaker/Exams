import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('userToken')
  if(token !== null){
    req = req.clone({
      setHeaders:{
        token: localStorage.getItem('userToken')!
      }
    })
  }
  return next(req);
};
