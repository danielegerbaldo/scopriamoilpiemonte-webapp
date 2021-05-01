import { Url } from "url";
import { Ruolo } from "./enums.model";

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

export class Evento{
  id: number;
  nome: String;
  descrizione: String;
  numMaxPartecipanti: number;
  partecipantiMin: number;
  partecipanti: number;
  prezzo: number;
  data: Date;
  liveStreaming: boolean;
  indirizzo: string;
  latitudine: number;
  longitudine: number;
  tipo: String;
  tema: String;
  ricorrenza: String;
  immagine: Url;
  luogo: String;
}