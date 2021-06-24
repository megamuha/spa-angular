import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";
import { Car } from "./car-interface";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "src/spa/services/user.interface";
import { AuthorizationUserService } from "src/spa/users/authorization-user-service";

@Injectable({ providedIn: 'root' })
export class AppData2Service {
  private CarsCollection: Array<Car> = [];
  private userUrl = 'http://localhost:3000/users';


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private authorizationUserService: AuthorizationUserService) {  }

  getUser(): Observable<User> {
      let idUser = this.authorizationUserService._id;
    const url = `${this.userUrl}/${idUser}`;
    return this.http.get<User>(url);
}
deleteCar(user: User, id: number): Observable<any> {
  let userId = this.authorizationUserService._id;
  const url = `${this.userUrl}/${userId}`;
  user.cars = user.cars.filter(i => i.id !== id);
  return this.http.put<User>(url, user);
}
}
