import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from './../../../services/data.service';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { SecurityUtils } from 'src/app/utils/security.util';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  public form: FormGroup;
  public busy: boolean = false;

  constructor(
    private router: Router,
    private dataService: DataService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required,
        CustomValidator.isCpf()
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ngOnInit(): void {
    const token = SecurityUtils.getToken();
    if (token) {
      this.busy = true;
      this.dataService
        .refreshToken()
        .subscribe(
          (data: any) => {
            this.busy = false;
            this.setUser(data.customer, data.token);
          },
          (err) => {
            localStorage.clear();
            this.busy = false;
          }
        );
    }
  }

  submit() {
    this.busy = true;
    this.dataService
      .authenticate(this.form.value)
      .subscribe(
        (data: any) => {
          this.busy = false;
          this.setUser(data.customer, data.token);
        },
        (err) => {
          console.log(err);
          this.busy = false;
        }
      );
  }

  setUser(user: User, token: string): void {
    SecurityUtils.set(user, token);
    this.router.navigate(['/']);
  }
}
