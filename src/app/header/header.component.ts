import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {StatoLogin} from "../../models/enums.model"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  StatoLogin = StatoLogin;
  @Input() statoLogin: StatoLogin;
  @Output() loginEmitter = new EventEmitter<StatoLogin>();

  constructor() { }

  ngOnInit(): void {
  }

  changeLoginStatus(nuovoStato: StatoLogin){
    this.loginEmitter.emit(nuovoStato);
  }

}
