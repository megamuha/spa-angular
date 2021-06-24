import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/services/car-interface';
import { Router } from '@angular/router';
import { AppDataService } from 'src/app/services/app-data.service';
import { AuthorizationUserService } from 'src/spa/users/authorization-user-service';
import { AppData2Service } from 'src/app/services/app-data2.service';
import { User } from 'src/spa/services/user.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  CarList?: Array<Car>;
  usersList?: Array<User>;
  deleteError?: string | null;
  deleteId?: number | null;
  isDeleting = false;
  constructor(private router: Router, private appData2Service: AppData2Service, private authorizationUserService: AuthorizationUserService) {
    // this.CarList = appData2Service.getCars();
    appData2Service.getUser().subscribe(data => {
      this.CarList = data.cars;
    })
   }

   ngOnInit(){
  }

deleteCarQuestion(id: number) {
  this.deleteError = null;
  this.deleteId =id;
}
deleteCar (id: number) {
  this.isDeleting = true;
    this.appData2Service.deleteCar(this.authorizationUserService.user, id).subscribe(c => {
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
