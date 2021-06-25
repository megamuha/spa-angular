import { Observable } from "rxjs";

export abstract class UserApi {
  signIn?: (username: string, password: string) => Observable<any>;
  signOut?: () => Observable<any>;
  registerUser?: (formData: any) => any;
  verifyUser?: (email: string) => Observable<any>;
}
