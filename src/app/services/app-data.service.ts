import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";
import { UserService } from "./user.service";
import { Car } from "./car-interface";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class AppDataService {

  /*private CarsCollection: Array<Car> =[
    {id: 1, name: "Ford", model: "Focus", price: 4500 },
    {id: 2, name: "Mazda", model: "626", price: 900 },
    {id: 3, name: "Chery", model: "QQ", price: 1200 },
    {id: 4, name: "Audi", model: "A6", price: 2200 },
    {id: 5, name: "BMW", model: "X5", price: 14500 },
    {id: 6, name: "Fiat", model: "Doblo", price: 2400 }
];*/
  private CarsCollection: Array<Car> = [];
  private url = 'http://localhost:3000/cars';

 
  constructor(public userService: UserService, private http: HttpClient) {  }

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
    /*let id = 0;
    this.CarsCollection.forEach(item => {
      if (item.id >= id) {
        id = item.id + 1;
      }
    });
    console.log(id);*/
    newCar.id = 10;
    return this.http.post<Car>(this.url, newCar);
  }

  updateCar(CarForUpdating: Car): Observable<any> {
    const url = `${this.url}/${CarForUpdating.id}`;
    return this.http.put<Car>(url, CarForUpdating);
  }
}