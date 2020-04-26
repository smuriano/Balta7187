import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DataService } from 'src/app/services/data.service';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html'
})
export class ResetPasswordPageComponent implements OnInit {

  public form: FormGroup;
  public busy = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    //private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      document: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required,
        CustomValidator.isCpf
      ])]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.busy = true;
    this.dataService.resetPassword(this.form.value).subscribe(
      (data: any) => {
        this.busy = false;
        this.toastr.success(data.message, 'Senha Restaurada');
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
        this.busy = false;
      }
    );
  }
}
