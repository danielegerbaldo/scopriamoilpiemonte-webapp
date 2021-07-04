import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ruolo } from 'src/models/enums.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dipendenti',
  templateUrl: './dipendenti.component.html',
  styleUrls: ['./dipendenti.component.css']
})
export class DipendentiComponent implements OnInit {

  dipendenti$ : Observable<any>;
  userID : number;
  comuneID : number;
  Ruolo = Ruolo;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getUtente().subscribe(
      utente => {
        this.userID = utente.userID;
        this.comuneID = utente.comuneDipendenteID;
        this.getDipendenti();
      }
    );
  }

  getDipendenti(){
    this.dipendenti$ = this.userService.getDipendentiComune(this.comuneID);
  }

  itsMe(user) : boolean{
    return user.id === this.userID;
  }

  printRuolo(user) : string{
    return this.userService.assignRuolo(user.ruoli);
  }

  isCollaboratore(user) : boolean{
    return this.userService.assignRuolo(user.ruoli) === Ruolo.collaboratore;
  }

  isClient(user) : boolean{
    return this.userService.assignRuolo(user.ruoli) === Ruolo.base;
  }

  changeRole(user, ruolo : Ruolo, $event : MouseEvent){
    ($event.target as HTMLButtonElement).disabled = true;
    this.userService.changeRole(user.id, ruolo).subscribe(
      result => {
        this.dipendenti$ = null;
        this.getDipendenti();
      }
    );
  }

}
