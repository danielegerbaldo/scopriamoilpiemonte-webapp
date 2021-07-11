import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Utente } from 'src/models/data.model';
import { MunicipalityService } from 'src/services/municipality.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-modifica-profilo',
  templateUrl: './modifica-profilo.component.html',
  styleUrls: ['./modifica-profilo.component.css']
})
export class ModificaProfiloComponent implements OnInit {

  utente : Utente;
  @Input() email : string;
  @Input() cf : string;
  @Input() telefono : string;
  submitting = false;
  comuni$;
  @Output() backEvent = new EventEmitter<boolean>();

  constructor(private userService : UserService, private municipalityService : MunicipalityService) { }

  ngOnInit(): void {
    this.userService.getUtente().subscribe(
      data => {
        this.utente = data;
        this.comuni$ = this.municipalityService.getComuni();
      }
    );
  }

  inoltraModifiche(){
    this.submitting = true;
    this.userService.modificaUtente(
      this.utente.userID,
      this.email,
      this.utente.nome,
      this.utente.cognome,
      this.cf,
      this.telefono,
      this.utente.comuneResidenzaID,
      this.utente.comuneDipendenteID
    ).subscribe(
      () => this.goBack()
    );
  }

  goBack(){
    this.backEvent.emit(false);
  }

}
