import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { delay, map, filter } from "rxjs/operators";
import { UserApi } from "../../spa/users/user-api";
import { User } from '../../spa/services/user.interface';


@Injectable()
export class UserService implements UserApi {
  isAuthenticated = false;
  private url = 'http://localhost:3000/users';
  constructor(private router: Router, private http: HttpClient) {

  }
  signIn(email: string, password: string): Observable<any> {
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
