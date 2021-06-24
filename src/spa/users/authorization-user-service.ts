import { Injectable } from "@angular/core";
import { User } from "../services/user.interface";

@Injectable()
export class AuthorizationUserService {

    public user: User;
    public role: string;
    public name: string;
    public _id : number;

    public setAuthorizedUser(user: User) {
        this.user = user;
    }

    public getUserRole(){
         this.role = this.user.role;
    }

    public getUserName(){
        this.name = this.user.name;
    }

    public getUserId(){
        this._id = this.user.id;
    }
}