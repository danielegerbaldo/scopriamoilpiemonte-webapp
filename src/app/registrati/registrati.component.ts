import {Component, OnInit } from '@angular/core';
import { StatoLogin } from "../../models/enums.model"
import { UserService } from "../../services/user.service"

@Component({
  selector: 'app-registrati',
  templateUrl: './registrati.component.html',
  styleUrls: ['./registrati.component.css']
})
export class RegistratiComponent implements OnInit {

  nome: string;
  email: string;
  pw1: string;
  pw2: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  registrati(){
    this.userService.setStatoLogin(StatoLogin.accesso);
  }

  passwordDiverse(){
    if(!(this.pw1 === this.pw2)){
      return true;
    }

  }

}
