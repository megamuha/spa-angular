import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/services/car-interface';
import { Router } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';
import { AuthorizationUserService } from 'src/spa/users/authorization-user-service';
import { User } from 'src/spa/services/user.interface';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-car-maint',
  templateUrl: './car-maint.component.html',
  styleUrls: ['./car-maint.component.css']
})
export class CarMaintComponent implements OnInit {
  CarList?: Array<Car>;
  deleteError?: string | null;
  deleteId?: number | null;
  isDeleting = false;
  currentCar: Car;
  public isAdmin: boolean = false;
  constructor(private router: Router, private appDataService: AppDataService, private authorizationUserService: AuthorizationUserService, private cookieService: CookieService) {
    appDataService.getCars().subscribe((data) => {this.CarList = data; });
   }

   ngOnInit(){
     if(this.cookieService.get('role') === 'admin'){
       this.isAdmin = true
    }
  }

  buyCar(id: number){
   this.currentCar = this.CarList.find(carItem => carItem.id === id);
   console.log(this.currentCar);

   this.appDataService.buyCar(this.authorizationUserService.user, id, this.currentCar).subscribe(c => {
    this.deleteCar(this.currentCar.id);
  },
    error => {
      this.deleteError = error;
      this.isDeleting = false;
    });
}
  
 
  createCar() {
    this.router.navigate(['/authenticated/car-detail', 0, 'create']);
  }
showCarDetail(id: number) {
  this.router.navigate(['/authenticated/car-detail', id, 'details']);
}
editCar(id: number) {
  this.router.navigate(['/authenticated/car-detail', id, 'edit']);
}
deleteCarQuestion(id: number) {
  this.deleteError = null;
  this.deleteId =id;
}
deleteCar (id: number) {
  this.isDeleting = true;
    this.appDataService.deleteCar(id).subscribe(c => {
      this.cancelDelete(),
      this.CarList = this.CarList.filter(carItem => carItem.id !== id);
    },
      error => {
        this.deleteError = error;
        this.isDeleting = false;
      });
}
cancelDelete() {
  this.isDeleting = false;
  this.deleteId = null;
}
}