import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  paginaSindaco: string = 'iscrizioni';

  constructor() { }

  ngOnInit(): void {
  }

  mioComune(): void {
    this.paginaSindaco = 'mioComune';
  }

  iscrizioni(): void{
    this.paginaSindaco = 'iscrizioni';
  }

  naviga(): void{
    this.paginaSindaco = 'naviga';
  }

  esci(): void{
    alert('logout');
  }

}
