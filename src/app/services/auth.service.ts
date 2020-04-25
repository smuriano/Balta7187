import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { SecurityUtils } from '../utils/security.util';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private route: Router) { }

  canActivate(): boolean {
    if (!SecurityUtils.hasToken()) {
      this.route.navigate(['/login']);
      return false;
    }

    return true;
  }
}
