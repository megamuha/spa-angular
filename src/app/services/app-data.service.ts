import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { Car } from "./car-interface";
import { Observable, of, throwError } from "rxjs";
import { delay, catchError, map, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";



@Injectable()
export class AppDataService {
    /*private CarsCollection: Array<Car> =[
        {id: 1, name: "Ford", model: "Focus", price: 4500 },
        {id: 2, name: "Mazda", model: "626", price: 900 },
        {id: 3, name: "Chery", model: "QQ", price: 1200 },
        {id: 4, name: "Audi", model: "A6", price: 2200 },
        {id: 5, name: "BMW", model: "X5", price: 14500 },
        {id: 6, name: "Fiat", model: "Doblo", price: 2400 }
    ];*/

    private CarsCollection: Array<Car>;
    private url = 'http://localhost:3000/cars';

    constructor(public userService: UserService, public http: HttpClient) {}

    getCars(): Observable<Car[]> {
        return this.http.get<Car[]>(this.url)
    }
 
    getCar(id: number): any {
        const car = this.CarsCollection.find(item => item.id === id);
        return of(car);
    }  
    deleteCar( id: number): Observable<any> {
        return of({}).pipe(delay(2000), map(()=> this.CarsCollection.splice(this.CarsCollection.findIndex(item => item.id === id), 1)));
    }
    createCar(newCar: Car): Observable<any> {
        let id=0;
        this.CarsCollection.forEach(item => {
            if(item.id >= id) {
                id = item.id + 1;
            }
        });
        newCar.id = id;
        this.CarsCollection.push(newCar);
        return of(newCar);
    }
    updateCar(CarForUpdating: Car) :Observable<any>{
        const car = this.CarsCollection.find(item => item.id === CarForUpdating.id);
        Object.assign(car, CarForUpdating);
        return of(car).pipe(delay(1200));
    }
}