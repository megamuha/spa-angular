import { Component, OnInit } from '@angular/core';
import { FieldInput } from 'src/spa/dynamicForms/field-interface';
import { Car } from 'src/app/services/car-interface';
import { AppDataService } from 'src/app/services/app-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { visibility } from 'src/spa/services/animations';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
  animations: [visibility]
})
export class CarDetailComponent implements OnInit {
  car?: Car;
  carDefinitionInput: Array<FieldInput> = [
    {
      key: 'id',
      type: 'number',
      isId: true,
      label: 'Id',
      required: true
    },
    {
      key: 'name',
      type: 'string',
      isId: false,
      label: 'Car name',
      required: true
    },
    {
      key: 'model',
      type: 'string',
      isId: false,
      label: 'Car model',
      required: true
    },
    {
      key: 'price',
      type: 'number',
      isId: false,
      label: 'Car price value',
      required: true
    }
  ];
  operation?: string; // edit/ read/ create
  errorMessage?: string | null;
  constructor(public router: Router, public route: ActivatedRoute, public appDataService: AppDataService) { }

  ngOnInit(): void {
    this.operation = this.route.snapshot.params['operation'];
    if( this.operation === 'create') {
      this.car = { id: 0, name: '', model: '', price: null};
    } else {
      this.appDataService.getCar(+this.route.snapshot.params['id']).subscribe((car: Car) => this.car = car);
    }
  }
  createCar(car: Car) {
    car.id = 0;
    this.errorMessage = null;
    this.appDataService.createCar(car).subscribe(
      c => this.router.navigate(['/authenticated/car-maint']),
      error => this.errorMessage ='Error creating car'
    );
  }
  updateCar(car: Car) {
    this.errorMessage = null;
    this.appDataService.updateCar(car).subscribe(
      c => this.router.navigate(['/authenticated/car-maint']),
      error => this.errorMessage ='Error updating car'
    );

  }
}