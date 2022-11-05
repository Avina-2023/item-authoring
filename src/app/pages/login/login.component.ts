import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/utils/app-config.service';
import { APP_CONSTANTS } from 'src/app/utils/app-constants.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  toggleVisibility = false;
  disableLogin = false;
  capsOn: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private https: ApiService,
    private authConfig: AppConfigService
  ) { }

  ngOnInit(): void {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(emailregex)]],
      password: ['', [Validators.required, Validators.maxLength(30)]],
    })
  }

  submit() {
    let data = {
      email: this.loginForm.value.email,
      pass: this.loginForm.value.password
    }
    this.https.register(data).subscribe((res: any) => {
      if (true) {
        this.authConfig.setlocalValue('token', res.token.access_token);
        this.authConfig.setlocalValue('firstname', res.data.attributes.firstName);
        this.authConfig.routeNavigation(APP_CONSTANTS.ENDPOINTS.ADMIN.DASHBOARD)
      } else {
        alert('Invalid user')
      }
    }
    )

  }
  forgotPassword() {
    this.router.navigate(['/forgot'])
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
