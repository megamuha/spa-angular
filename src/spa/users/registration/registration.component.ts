import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { visibility } from '../../services/animations';
import { UserApi } from '../user-api';

@Component({
  selector: 'spa-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [visibility],
})
export class RegistrationComponent implements OnInit {
  registering = false;
  hasAdded = false;
  formError?: string;
  constructor(private router: Router, private userApi: UserApi) { }

  ngOnInit(): void {
  }

  onSubmit(registerForm: NgForm) {
    this.registering = true;
    this.userApi.registerUser!(registerForm.value).subscribe(() => {
      setTimeout(() => { this.hasAdded = true; }, 1200);
      setTimeout(() => { this.router.navigate(['/sign-in']); }, 2000);
    });
  }

}
