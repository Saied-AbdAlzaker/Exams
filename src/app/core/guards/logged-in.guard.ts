import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router)

  if (localStorage.getItem('userToken')) {
    _router.navigate(['/home'])
    return false
  } else {
    return true
  }
};
