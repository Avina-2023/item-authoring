import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
  loginForm: FormGroup | any;
  toggleVisibility = false;
  disableLogin = false;
  capsOn: any;
  constructor(
    private fb: FormBuilder,


  ) { }

  ngOnInit(): void {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(emailregex)]],
      password: ['', [Validators.required, Validators.maxLength(30)]],
    })
  }

  // submit() {
  //   this.route.navigate(['/homedash'])
  // }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

}
