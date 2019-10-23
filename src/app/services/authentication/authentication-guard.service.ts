import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService  implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const user = await this.auth.getUser();
    if (!user) {
      this.router.navigate(['/login']);
    }
    return !!user;
  }

}
