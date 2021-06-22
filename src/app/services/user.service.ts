import { Injectable } from "@angular/core";
import { UserApi } from "src/spa/users/user-api";
import { Router } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import {delay, map} from 'rxjs/operators';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { User } from "src/spa/services/user.interface";
import {Http} from '@angular/http';

@Injectable()
export class UserService implements UserApi {
    isAuthenticated = false;
    dataTransfer: Array<any>;
    private url = 'http://localhost:3000/users';

    constructor(public router:  Router, public http: HttpClient) {
        this.dataTransfer = null;
    } 

    signIn(email: string, password: string): Observable<any>{
        return this.http.get<User[]>(this.url);
}
    
  signOut(): Observable<any> {
    this.isAuthenticated = false;
    localStorage.clear();
    this.router.navigate(['/sign-in']);
    return of({});
  }

  registerUser(registerForm: User) {
    return this.http.post(this.url, {
      name: registerForm.name, email: registerForm.email,
      password: registerForm.password
    });
  }

}