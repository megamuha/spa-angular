import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";
import { Car } from "./car-interface";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthorizationUserService } from "src/spa/users/authorization-user-service";
import { User } from "src/spa/services/user.interface";

@Injectable({ providedIn: 'root' })
export class AppDataService {
  private CarsCollection: Array<Car> = [];
  private url = 'http://localhost:3000/cars';
  private userUrl = 'http://localhost:3000/users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private authorizationUserService: AuthorizationUserService) {  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.url);
  }

  getCar(id: number): Observable<Car> {
    const url = `${this.url}/${id}`;
    return this.http.get<Car>(url);
  }

  deleteCar(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Car>(url);
  }

  createCar(newCar: Car): Observable<any> {
    newCar.id = Math.floor(Math.random() * 500) + 1;
    return this.http.post<Car>(this.url, newCar);
  }

  updateCar(CarForUpdating: Car): Observable<any> {
    const url = `${this.url}/${CarForUpdating.id}`;
    return this.http.put<Car>(url, CarForUpdating);
  }

  buyCar(user: User, id: number, myCar: Car){
   const url = `${this.userUrl}/${user.id}`;
   user.cars.push(myCar);
   return this.http.put<User>(url, user);
  }
}
