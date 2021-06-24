import { Injectable } from "@angular/core";
import { User } from "../services/user.interface";

@Injectable()
export class AuthorizationUserService {

    private user: User;

    public setAuthorizedUser(user: User) {
        this.user = user;
    }

    public getUserRole(): string {
        return this.user.role;
    }

    public getUserName(): string {
        return this.user.name;
    }
}