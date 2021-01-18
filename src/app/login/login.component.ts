import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() nuovaPagina = new EventEmitter<string>();

  utenteSconosciuto: boolean;

   email: string;
   password: string;

  constructor() { }

  ngOnInit(): void {
  }

  registrati(){
    this.nuovaPagina.emit("registrati");
  }

  accedi(){
    if(this.email === 'sindaco' && this.password === 'sindaco'){
      this.utenteSconosciuto = false;
      this.nuovaPagina.emit("sindaco-home")
    }else{
      this.utenteSconosciuto = true;
    }
  }

}
