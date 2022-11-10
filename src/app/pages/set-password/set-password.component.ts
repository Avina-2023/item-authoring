import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  loginForm: FormGroup | any;
  currentYear: number | undefined;
  disableLogin = false;
  toggleVisibility = false;
  constructor(
    private fb: FormBuilder,
    private authConfig: AppConfigService,
  ) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(emailregex)]],
      password: ['', [Validators.required, Validators.maxLength(30)]],

    })
  }
  next() {
    this.authConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.LOGIN)
  }
  Goback() {
    this.authConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.LOGIN)
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
