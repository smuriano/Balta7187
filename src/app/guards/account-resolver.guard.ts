import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

import { DataService } from '../services/data.service';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountResolverGuard implements Resolve<Account> {

  constructor(private dataService: DataService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Account> {
    return this.dataService.getProfile();
  }
}
