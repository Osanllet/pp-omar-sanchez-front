import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from '../config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router) {
    this.getStorage();
  }

  generateHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      })
    };

    return httpOptions;
  }

  isLogged() {
    return (this.token.length > 5) ? true : false;
  }

  logout() {
    this.token = '';
    localStorage.removeItem('token');

    this.router.navigateByUrl('/login');
  }

  getStorage() {
    this.token = localStorage.getItem('token') ? localStorage.getItem('token') : this.token = '';
  }

  saveUser(user) {
    const url = GLOBAL.urlAPI + 'user';

    return this.http.post(url, user, this.generateHeaders()).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getUsers( searchedTerms? ) {
    let url = GLOBAL.urlAPI + 'users';

    if ( searchedTerms !== undefined ) {
      url = `${url}?searchedTerms=${searchedTerms}`;
    }

    return this.http.get(url, this.generateHeaders()).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteUser(id) {
    const url = GLOBAL.urlAPI + 'user/' + id;

    return this.http.delete(url, this.generateHeaders()).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
