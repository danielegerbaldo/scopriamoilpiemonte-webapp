import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  token : string = null;

  constructor() { }

  getToken(){
    return this.token;
  }

  setToken(tok : string){
    this.token = tok;
  }

  clearToken(){
    this.token = null;
  }
}
