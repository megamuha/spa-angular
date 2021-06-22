import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { visibility } from 'src/spa/services/animations';
import { UserApi } from '../user-api';

@Component({
  selector: 'spa-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  animations: [visibility]
})
export class SignInComponent implements OnInit {
  submitting = false;
  formError?: any;
  constructor(public userApi: UserApi, public userService: UserService, public router: Router) { }
  onSubmit(signInForm: NgForm): void {
    if (signInForm.valid) {
      this.submitting = true;
      this.formError = null;
      this.userApi.signIn(signInForm.value.email, signInForm.value.password).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/authenticated']);
      },
    (error) => {
      this.submitting = false;
      this.formError = error;
    });
    }
  }
  ngOnInit() {
  }

}