import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistratiComponent } from './registrati/registrati.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FiltersComponent } from './main-page/filters/filters.component';
import { FilterService } from '../services/filter.service';
import { VistaEventiComponent } from './main-page/vista-eventi/vista-eventi.component'
import { UserService } from '../services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistratiComponent,
    HeaderComponent,
    NavbarComponent,
    MainPageComponent,
    FiltersComponent,
    VistaEventiComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
    ],
  providers: [
    FilterService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
