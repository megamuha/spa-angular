import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SpaModule } from 'src/spa/spa.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHomeComponent } from './routes/app-home/app-home.component';
import { appRoutes } from './routes/app.routes';
import { SettingsComponent } from './routes/settings/settings.component';
import { CarDetailComponent } from './routes/car-detail/car-detail.component';
import { CarListComponent } from './routes/car-list/car-list.component';
import { CarMaintComponent } from './routes/car-maint/car-maint.component';
import { AuthenticatedComponent } from './routes/authenticated/authenticated.component';
import { UserService } from './services/user.service';
import { UserApi } from 'src/spa/users/user-api';
import { AuthGuard } from './services/auth-gard';
import { AppDataService } from './services/app-data.service';
import { AppData2Service } from './services/app-data2.service';
import { CarPanelComponent } from './panels/car-panel/car-panel.component';
import { ImagePanelComponent } from './panels/image-panel/image-panel.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorizationUserService } from 'src/spa/users/authorization-user-service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    SettingsComponent,
    CarDetailComponent,
    CarListComponent,
    CarMaintComponent,
    AuthenticatedComponent,
    CarPanelComponent,
    ImagePanelComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    SpaModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    UserService,
    { provide: UserApi, useExisting: UserService },
    AuthGuard,
    AppDataService,
    AuthorizationUserService,
    AppData2Service,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
