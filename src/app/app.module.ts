import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { MappaComponent } from './mappa/mappa.component';
import { GeneraEventoComponent } from './genera-evento/genera-evento.component';
import { EventiService } from 'src/services/eventi.service';
import { AuthInterceptor } from 'src/services/interceptor';
import { ProfiloComponent } from './profilo/profilo.component';
import { CookieService } from 'ngx-cookie-service';
import { DipendentiComponent } from './dipendenti/dipendenti.component';


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
    MappaComponent,
    GeneraEventoComponent,
    ProfiloComponent,
    DipendentiComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [
    FilterService,
    UserService,
    EventiService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
