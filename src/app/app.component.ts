import { Component } from '@angular/core';
import { MenuService } from 'src/spa/services/menu.service';
import { SpaConfigService } from 'src/spa/services/spa-config.service';
import { SpaConfigSettings, Icons } from 'src/spa/services/spa-config.service';
import { AppMenuItems } from './app.menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( public spaConfigService: SpaConfigService, public menuService: MenuService) {
    const config: SpaConfigSettings = {
      socialIcons: [
        {imageFile: '/assets/imgs/facebook.png', alt: 'Facebook', url: 'http://facebook.com'},
        {imageFile: '/assets/imgs/instagram.png', alt: 'Instargram', url: 'http://www.instagram.com'},
        {imageFile: '/assets/imgs/twitter.png', alt: 'Twitter', url: 'http://twitter.com'},
        {imageFile: '/assets/imgs/whatsapp.png', alt: 'WhatsApp', url: 'http://www.whatsapp.com'},
      ],
      showUserControls: true
    };
    spaConfigService.configure(config);
    menuService.items = AppMenuItems;
  }
 
 }