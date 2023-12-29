import { CanActivateFn } from '@angular/router';

export const blogAddGuard: CanActivateFn = (route, state) => {
  return !!localStorage.getItem('loggedIn');
};
