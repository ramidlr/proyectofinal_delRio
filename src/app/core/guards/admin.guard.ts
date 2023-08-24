import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthUserAdmin } from '../../store/auth/auth.selector';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  return inject(Store).select(selectAuthUserAdmin).pipe(
    map((isAdmin) => {
      if (!isAdmin) {
        console.log(adminGuard.name, 'No es admin. Redirige al home')
        return router.createUrlTree(['/dashboard/home'])
      }
      return true

    })
  )
};
