import { Ruolo } from "./enums.model";

export class Utente{
  nome: String;
  cognome: String;
  ruolo: Ruolo;
  comuneResidenzaID: number;
  comuneDipendenteID: number;
  userID: number;
}

export class FiltriEventi{
  distanza: number;
  nascondiPieni: boolean;
  prezzoMin: number;
  prezzoMax: number;
  dataMin: Date;
  dataMax: Date;
  iscrizioni: boolean;
  noIscrizioni: boolean;
}

export class Evento{
  id: number;
  nome: String;
  descrizione: String;
  note: String;
  numMaxPartecipanti: number;
  partecipantiMin: number;
  partecipanti: number;
  tipoEvento: {
    nome: String,
    descrizione: String
  }
  prezzo: number;
  data: Date;
  streaming: boolean;
  indirizzo: string;
  latitudine: number;
  longitudine: number;
  proprietario: number;
  comune: number;
  iscritti : number[];
  //tipo: String;
  //tema: String;
  //ricorrenza: String;
  //immagine: Url;
  //luogo: String;
}