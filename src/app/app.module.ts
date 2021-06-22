import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {OverlayModule} from '@angular/cdk/overlay';

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
    GeneraEventoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatStepperModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
      MatInputModule,
    MatExpansionModule,
    CdkStepperModule,
    MatButtonModule,
    MatButtonToggleModule,
    OverlayModule
  ],
  providers: [
    FilterService,
    UserService,
    EventiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
