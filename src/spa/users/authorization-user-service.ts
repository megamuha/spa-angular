import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { User } from "../services/user.interface";

@Injectable()
export class AuthorizationUserService {

    public user: User;
    public role: string;
    public name: string;
    public _id : string;

    constructor(private cookieService: CookieService) {}

    public setAuthorizedUser(user: User) {
        this.user = user;
    }

    public getUserRole(){
         this.role = this.user.role;
         this.cookieService.set('role', this.role);
    }

    public getUserName(){
        this.name = this.user.name;
        this.cookieService.set('name', this.name);
    }

    public getUserId(){
        this._id = this.user.id.toString();
        this.cookieService.set('id', this._id);
    }
    public setGlobal(){

    }
}