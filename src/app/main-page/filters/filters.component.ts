import { Component, OnInit } from '@angular/core';
import { FiltriEventi } from '../../../models/data.model';
import { FilterService } from '../../../services/filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  filtri: FiltriEventi;

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.getFiltri();
    this.filtri.dataMax = new Date();
    this.filtri.dataMax.setFullYear(this.filtri.dataMin.getFullYear() +1);
  }

  verificaPrezzi(){
    if(this.filtri.prezzoMin > this.filtri.prezzoMax){
      this.filtri.prezzoMax = this.filtri.prezzoMin;
    }
  }

  getFiltri(){
    this.filtri = this.filterService.getFiltri();    
  }
}
