import { Injectable } from "@angular/core";
import { User } from "../services/user.interface";

@Injectable()
export class AuthorizationUserService {

    private user: User;

    public getAuthorizedUser(user: User) {
        this.user = user;
    }
    public getUserPermissions(): string[] {
        return this.user.permissions;
    }
}