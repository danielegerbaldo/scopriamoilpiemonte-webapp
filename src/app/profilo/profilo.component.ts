import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  codiceFiscale: string;
  telefono: string;
  nomeComuneResidenza: string;
  provinciaComuneResidenza: string;
  latitudineResidenza: number;
  longitudineResidenza: number;
  nomeComuneDipendente: string;
  provinciaComuneDipendente: string;
  latitudineDipendente: string;
  longitudineDipendente: string;
  ruolo: Ruolo;
  email: string;
  pw1: string;
  pw2: string;

  modifyPage = false;

  constructor(private userService : UserService, private changeDetector : ChangeDetectorRef) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    var id : number;
    this.userService.getUtente().subscribe(
      u => {
        id = u.userID;
        this.getInfoUtente(id);
      }
    );
  }

  getInfoUtente(id : number){
    this.userService.downloadInfoUtente(id).subscribe(
      info => {
        this.nome = info.nome;
        this.cognome = info.cognome;
        this.codiceFiscale = info.cf;
        this.telefono = info.telefono;
        this.nomeComuneResidenza = info.comuneResidenza?.nome;
        this.provinciaComuneResidenza = info.comuneResidenza?.provincia;
        this.latitudineResidenza = info.comuneResidenza?.lat;
        this.longitudineResidenza = info.comuneResidenza?.lng;
        this.nomeComuneDipendente = info.dipendenteDiComune?.nome;
        this.provinciaComuneDipendente = info.dipendenteDiComune?.provincia;
        this.latitudineDipendente = info.dipendenteDiComune?.lat;
        this.longitudineDipendente = info.dipendenteDiComune?.lng;
        this.ruolo = this.userService.assignRuolo(info.ruoli);
        this.email = info.email;
      }
    )
  }

  changePage(modify : boolean){
    this.modifyPage = modify;
  }

}
