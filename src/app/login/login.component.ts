import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    public router: Router,
    public loginService: LoginService,
    public userService: UsersService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('osanllet@gmail.com', [
        Validators.required,
        Validators.pattern('(?:^[a-z0-9._%+-]+@[a-z0-9-]+.+.[a-z]{2,4}$)')
      ]),
      password: new FormControl('123456', [
        Validators.required
      ])
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.errorMessage = '';
      this.loginService.login(this.loginForm.value)
        .subscribe(
          res => {
            this.router.navigateByUrl('/usuarios');
          },
          err => {
            this.errorMessage = err.error.err.message;
          }
        );
      console.log(this.loginForm.value);
    } else {
      this.errorMessage = 'Información incompleta, todos los campos son obligatorios.';
    }
  }

}
