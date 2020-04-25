import { SecurityUtils } from './../../../utils/security.util';
import { User } from './../../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  public user: User;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = SecurityUtils.getUser();
  }

  logout(): void {
    SecurityUtils.clear();
    this.router.navigate(['/login']);
  }
}
