import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Scopriamo il Piemonte';
  //con @input dichiaro che questa variabile può essere modificata da una variabile esterna
  @Input() pagina: string = 'login';

  getPagina(event){
    this.pagina = event;
  }
}
