import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";
import { Car } from "./car-interface";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AppDataService {
  private CarsCollection: Array<Car> = [];
  private url = 'http://localhost:3000/cars';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {  }

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
    let id = 0;
    this.CarsCollection.forEach(item => {
      if (item.id >= id) {
        id = item.id + 1;
      }
    });
    newCar.id = id;
    return this.http.post<Car>(this.url, newCar);
  }

  updateCar(CarForUpdating: Car): Observable<any> {
    const url = `${this.url}/${CarForUpdating.id}`;
    return this.http.put<Car>(url, CarForUpdating);
  }
}
