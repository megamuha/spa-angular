import { Component, OnInit } from '@angular/core';
import { visibility } from 'src/spa/services/animations';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserApi } from '../user-api';

@Component({
  selector: 'spa-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [visibility]
})
export class RegistrationComponent implements OnInit {
  hasAdded = false;
  registering = false;
  formError?: string;

  constructor(public router: Router, public userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(registerForm: NgForm){
    this.registering = true;
    this.userService.registerUser!(registerForm.value).subscribe(() => {
      setTimeout(() => { this.hasAdded = true; }, 1200);
      setTimeout(() => { this.router.navigate(['/sign-in']); }, 2000);
    });
  }
  }
