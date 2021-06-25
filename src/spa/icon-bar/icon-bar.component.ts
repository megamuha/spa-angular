import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SpaConfigService } from '../services/spa-config.service';
import { User } from '../services/user.interface';
import { UserApi } from '../users/user-api';
import { SignInComponent } from '../users/sign-in/sign-in.component';
import { isNgTemplate } from '@angular/compiler';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'icon-bar',
  templateUrl: './icon-bar.component.html',
  styleUrls: ['./icon-bar.component.css']
})
export class IconBarComponent implements OnInit {
  showLoader!: boolean;
  @Input() showIcons: any;
  userInfo!: string;
  constructor(public spaConfigService: SpaConfigService, public userApi: UserApi, private cookieService: CookieService) {

   }

  ngOnInit() {
    this.showLoader = false;
    this.userInfo = this.cookieService.get('name');
  }
  signOut() {
    this.showLoader = true;
    setTimeout(() => { this.userApi.signOut(); }, 2000);
    console.log('Sign out');
  }
}