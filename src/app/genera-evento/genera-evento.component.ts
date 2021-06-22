import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Evento } from '../../models/data.model';
import { EventiService } from '../../services/eventi.service';
import { UserService } from '../../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-genera-evento',
  templateUrl: './genera-evento.component.html',
  styleUrls: ['./genera-evento.component.css'],
  providers: [{ provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}}]
})
export class GeneraEventoComponent implements OnInit {
  isOptional = true;
  isLinear = true;
  panelOpenState = false;
  @Input() firstFormGroup: FormGroup;
  @Input() secondFormGroup: FormGroup;
  @Input() thirdFormGroup: FormGroup;
  @Input() fourthFormGroup: FormGroup;
  @Input() fifthFormGroup: FormGroup;
  @Input() sixthFormGroup: FormGroup;
  @Input() seventhFormGroup: FormGroup;
  @Input() eighthFormGroup: FormGroup;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  BingMapsAPIKey = 'ArOu7EQ5tMWMGG0UsGGxRKBYx4XfoCLXsceSt6ZCkloQ3urZS6MevEBDjaKwuFv7';
  map = null;
  pin = null;

  @ViewChild('myMap') myMap : ElementRef<HTMLDivElement>; // using ViewChild to reference the div instead of setting an id

  evento: Evento = {
    "id": null,
    "nome": "",
    "descrizione": "",
    "note": "Created in webapp form",
    "numMaxPartecipanti": 1000,
    "partecipantiMin": 0,
    "partecipanti": 0,
    "prezzo": 0,
    "data": null,
    "streaming": false,
    "tipoEvento": {
      "nome": "bo",
      "descrizione": "bo"
    },
    "indirizzo": "",
    "latitudine": 0,
    "longitudine": 0,
    "proprietario": 1,
    "comune": 1,
    "iscritti": []
  };
  submitted = false;
  posting = false;

  constructor(private eventiService : EventiService, private userService : UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.firstFormGroup = new FormGroup({
      firstCtrl: new FormControl(null, Validators.required)
    });
    this.secondFormGroup = new FormGroup({
      secondCtrl: new FormControl(null, Validators.required)
    });
    this.thirdFormGroup = new FormGroup({
      thirdCtrl: new FormControl(null)
    });
    this.fourthFormGroup = new FormGroup({
      fourthCtrl: new FormControl(null)
    });
    this.fifthFormGroup = new FormGroup({
      fifthCtrl: new FormControl(null)
    });
    this.sixthFormGroup = new FormGroup({
      sixthCtrl: new FormControl(null, Validators.required)
    });
    this.seventhFormGroup = new FormGroup({
      seventhCtrl: new FormControl(null)
    });
  }

  ngAfterViewInit(){
    if (typeof Microsoft !== 'undefined') {
      console.log('BingMapComponent.ngOnInit');
      this.loadMap();
    }
  }

  loadMap(){
    this.map = new Microsoft.Maps.Map(this.myMap.nativeElement, {
      credentials: this.BingMapsAPIKey,
      center: new Microsoft.Maps.Location(45.071222, 7.685090)
    });
    Microsoft.Maps.Events.addHandler(this.map, "click", this.getCoordinates);
  }

  getCoordinates = (event) => {
    if (event.targetType == "map") {
      var point = new Microsoft.Maps.Point(event.getX(), event.getY());
      var loc = event.target.tryPixelToLocation(point);
      this.evento.latitudine = loc.latitude;
      this.evento.longitudine = loc.longitude;
      this.pin = new Microsoft.Maps.Pushpin(loc, {
        title: '' + this.evento.nome,
        color: 'red'
      });
      this.map.entities.clear();
      this.map.entities.push(this.pin);
      this.getAddress();
    }
  }

  getAddress = () => {
    Microsoft.Maps.loadModule(
        'Microsoft.Maps.Search',
        this.loadSearch);
  }

  onSubmit = () => { 
    this.posting = true;
    console.log(this.evento);
    this.eventiService.addEvento(this.evento).subscribe(
        () => this.submitted = true
    )
  }

  loadSearch = () => {
    var searchManager = new Microsoft.Maps.Search.SearchManager(this.map);
    var searchRequest = {
      location: new Microsoft.Maps.Location(this.evento.latitudine, this.evento.longitudine),
      callback: this.searchCallback,
      errorCallback: function (e) {
        console.log(e);
      }
    }
    searchManager.reverseGeocode(searchRequest);
  }

  searchCallback = (r) => {
    //console.log(r);
    this.evento.indirizzo = r.address.addressLine;
    // this.evento.comune = r.address.locality
    document.getElementById('geocode').innerHTML = this.evento.indirizzo;
  }

  updateNome() { this.evento.nome = this.firstFormGroup.get('firstCtrl').value; }
  updateDescrizione() { this.evento.descrizione = this.secondFormGroup.get('secondCtrl').value; }
  updateNumMaxPartecipanti() { this.evento.numMaxPartecipanti = this.thirdFormGroup.get('thirdCtrl').value; }
  updatePartecipantiMin() { this.evento.partecipantiMin = this.fourthFormGroup.get('fourthCtrl').value; }
  updatePrezzo() { this.evento.prezzo = this.fifthFormGroup.get('fifthCtrl').value; }
  updateData() { this.evento.data = this.sixthFormGroup.get('sixth').value; }
  updateStreaming() {    this.evento.streaming = this.seventhFormGroup.get('seventhCtrl').value; }
}
