import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  token : String = null;

  constructor() { }

  getToken(){
    return this.token;
  }

  setToken(tok : String){
    this.token = tok;
  }

  clearToken(){
    this.token = null;
  }
}
