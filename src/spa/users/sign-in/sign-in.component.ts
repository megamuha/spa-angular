import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../app/services/user.service';
import { visibility } from '../../services/animations';
import { User } from '../../services/user.interface';
import { AuthorizationUserService } from '../authorization-user-service';
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
  

  constructor(private userApi: UserApi, private userService: UserService, private router: Router, private authorizationUserService: AuthorizationUserService ) { }

  ngOnInit(): void {
  }
  onSubmit(signInForm: NgForm) {
    if (signInForm.valid) {
      this.submitting = true;
      this.formError = undefined;
      this.userApi.signIn!(signInForm.value.email, signInForm.value.password).subscribe((data) => {
        var users = data;
        var currentUser: User = users.find((item: User) => item.email === signInForm.value.email && item.password === signInForm.value.password);
        
        this.authorizationUserService.setAuthorizedUser(currentUser);
        


        if (currentUser) {
          this.authorizationUserService.getUserId();
          this.authorizationUserService.getUserName();
          this.authorizationUserService.getUserRole(); 
          this.router.navigate(['/authenticated']);
          
        }        
        else {
          this.submitting = false;
          this.formError = "Пользователь не найден";
        }
      },
        (error) => {
          this.submitting = false;
          this.formError = error;
        });
    }
    
  }

}
