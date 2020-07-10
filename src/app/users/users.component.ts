import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  errorMessage: string;
  users = [];
  userIndex: number;
  idUser: string;
  serchedTerms: string;

  constructor(
    public userService: UsersService,
    public router: Router
  ) {
    if ( this.userService.isLogged() ) {
      this.getUsers();
    } else {
      this.router.navigateByUrl('/login');
    }
   }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('(?:^[a-z0-9._%+-]+@[a-z0-9-]+.+.[a-z]{2,4}$)')
      ]),
      phone_number: new FormControl('', [
        Validators.required,
        Validators.pattern('(?:^[0-9]{10}$)')
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      gender: new FormControl('', [
        Validators.required
      ]),
      hobby: new FormControl('', [
        Validators.required
      ])
    });
  }

  saveUser() {
    if (this.userForm.valid) {
      this.userService.saveUser(this.userForm.value).subscribe(
        res => {
          $('#NewUserModal').modal('hide');
          this.getUsers();
          this.userForm.reset();
          this.errorMessage = '';
        },
        err => {
          this.errorMessage = err.error.message;
        }
      );
    } else {
      this.errorMessage = 'Información incompleta, todos los campos obligatorios deben estar llenos.';
    }
  }

  getUsers() {
    this.userService.getUsers(this.serchedTerms).subscribe(
      res => {
        this.serchedTerms = '';
        this.users = res.users;
      }
    );
  }

  saveIndex(index, idUser) {
    this.userIndex = index;
    this.idUser = idUser;
    $('#DeleteUserModal').modal('show');
  }

  deleteUser( ){
    this.userService.deleteUser(this.idUser).subscribe(
      res => {
        this.users.splice(this.userIndex, 1);
        $('#DeleteUserModal').modal('hide');
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
