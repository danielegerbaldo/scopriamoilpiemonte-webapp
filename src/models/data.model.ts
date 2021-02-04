import {Ruolo} from "./enums.model";

export class Utente{
  nome: String;
  ruolo: Ruolo;
  comune: String;
}

export class FiltriEventi{
  distanza: number;
  nascondiPieni: boolean;
  prezzoMin: number;
  prezzoMax: number;
  dataMin: Date;
  dataMax: Date;
}