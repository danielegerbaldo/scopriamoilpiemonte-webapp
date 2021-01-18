import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-registrati',
  templateUrl: './registrati.component.html',
  styleUrls: ['./registrati.component.css']
})
export class RegistratiComponent implements OnInit {

  @Output() nuovaPagina = new EventEmitter<string>();

  pw1: string;
  pw2: string;

  constructor() { }

  ngOnInit(): void {
  }

  annulla(){
    this.nuovaPagina.emit('login')
  }

  passwordDiverse(){
    if(!(this.pw1 === this.pw2)){
      return true;
    }

  }

}
