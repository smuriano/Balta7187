import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DataService } from './../../../services/data.service';
import { Account } from '../../../models/account.model';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent implements OnInit {

  public form: FormGroup;
  public busy = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    //private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      _id: [''],
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(80),
        Validators.required
      ])],
      document: [{ value: '', disabled: true }],
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(120),
        Validators.required,
        CustomValidator.isEmail
      ])],
    });

  }

  ngOnInit(): void {
    //const account: Account = this.route.snapshot.data['account'];

    this.busy = true;
    this.dataService.getProfile().subscribe(
      (data: Account) => {
        this.busy = false;
        this.form.controls['_id'].setValue(data._id);
        this.form.controls['name'].setValue(data.name);
        this.form.controls['document'].setValue(data.document);
        this.form.controls['email'].setValue(data.email);
      },
      (err) => {
        console.log(err);
        this.busy = false;
      }
    );
  }

  onSubmit(): void {
    this.busy = true;
    this.dataService.updateProfile(this.form.value).subscribe(
      (data: any) => {
        this.busy = false;
        this.toastr.success(data.message, 'Atualização Completa!');
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err);
        this.busy = false;
      }
    );
  }
}
