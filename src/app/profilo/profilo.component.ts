import { Component, OnInit } from '@angular/core';
import { Ruolo } from 'src/models/enums.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {

  nome: string;
  cognome: string;
  codiceFiscale: string = "";
  telefono: string = "";
  nomeComuneResidenza: string;
  provinciaComuneResidenza: string;
  nomeComuneDipendente: string;
  provinciaComuneDipendente: string;
  ruolo: Ruolo;
  email: string;
  pw1: string;
  pw2: string;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    var id : number;
    this.userService.getUtente().subscribe(
      u => {
        id = u.userID;
        this.getInfoUtente(id);
      }
    )
  }

  getInfoUtente(id : number){
    this.userService.downloadInfoUtente(id).subscribe(
      info => {
        this.nome = info.nome;
        this.cognome = info.cognome;
        this.codiceFiscale = info.cf;
        this.telefono = info.telefono;
        this.nomeComuneResidenza = info.comuneResidenza.nome;
        this.provinciaComuneResidenza = info.comuneResidenza.provincia;
        this.nomeComuneDipendente = info.dipendenteDiComune.nome;
        this.provinciaComuneDipendente = info.dipendenteDiComune.provincia;
        this.ruolo = this.userService.assignRuolo(info.ruoli);
        this.email = info.email;
      }
    )
  }

}
