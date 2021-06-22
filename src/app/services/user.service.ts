import { Injectable } from "@angular/core";
import { UserApi } from "src/spa/users/user-api";
import { Router } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import {delay} from 'rxjs/operators';

@Injectable()
export class UserService implements UserApi {
    isAuthenticated = false;
    constructor(public router:  Router) {

    }
    signIn(email: string, password: string): Observable<any> {
       /* if (email === 'test@mail.ru' && password === '123')
        {*/
        this.isAuthenticated = true;
        return of({}).pipe(delay(50));
   /* } else {return throwError('Invalid email or password');}*/
    }
    signOut(): Observable<any> {
        this.isAuthenticated = false;
        this.router.navigate(['/sign-in']);
        return of({});
    }
}