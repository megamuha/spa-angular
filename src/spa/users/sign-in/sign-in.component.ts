import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../app/services/user.service';
import { visibility } from '../../services/animations';
import { User } from '../../services/user.interface';
import { UserApi } from '../user-api';

@Component({
  selector: 'spa-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  animations: [visibility],
})
export class SignInComponent implements OnInit {
  submitting = false;
  formError?: string;

  constructor(private userApi: UserApi, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(signInForm: NgForm) {
    // Проверка на валидность формы
    if (signInForm.valid) {
      this.submitting = true;
      this.formError = undefined;
      this.userApi.signIn!(signInForm.value.email, signInForm.value.password).subscribe((data) => {
        // в случае успеха
        var users = data;
        var currentUser: User[] = users.filter((item: User) => item.email === signInForm.value.email && item.password === signInForm.value.password);
        if (currentUser.length) {
          this.router.navigate(['/authenticated']);
        }
        else {
          this.submitting = false;
          this.formError = "user not found";
        }
      },
        // в случае ошибки
        (error) => {
          this.submitting = false;
          this.formError = error;
        });
    }
  }

}
