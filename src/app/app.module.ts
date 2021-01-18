import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistratiComponent } from './registrati/registrati.component';
import { HomeComponent } from './sindaco/home/home.component';
import { NuovoEventoComponent } from './sindaco/nuovo-evento/nuovo-evento.component';
import { MioComuneComponent } from './sindaco/mio-comune/mio-comune.component';
import { IscrizioniComponent } from './sindaco/iscrizioni/iscrizioni.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistratiComponent,
    HomeComponent,
    NuovoEventoComponent,
    MioComuneComponent,
    IscrizioniComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
