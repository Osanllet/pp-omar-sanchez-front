import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '../config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    public http: HttpClient,
    public router: Router ) {
  }

  login(user) {
    const url = GLOBAL.urlAPI + 'login';

    return this.http.post(url, user).pipe(
      map((res: any) => {
        localStorage.setItem('token', res.token);

        return true;
      })
    );
  }
}
