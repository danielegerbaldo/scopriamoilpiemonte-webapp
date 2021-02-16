import { Component, OnInit } from '@angular/core';
import { UrlHandlingStrategy } from '@angular/router';
import { Evento } from "../../models/data.model";

@Component({
  selector: 'app-genera-evento',
  templateUrl: './genera-evento.component.html',
  styleUrls: ['./genera-evento.component.css']
})
export class GeneraEventoComponent implements OnInit {

  evento: Evento = {
    "nome": "",
    "descrizione": "",
    "numeroPosti": 1000,
    "partecipantiMin": 0,
    "prenotazioni": 0,
    "prezzo": 0,
    "data": null,
    "liveStreaming": false,
    "tipo": "",
    "tema": "",
    "ricorrenza": "",
    "immagine": null,
    "luogo": ""
  };
  submitted = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() { 
    this.submitted = true;
    console.log(this.evento);
  }

}
