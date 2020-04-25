import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Pet } from 'src/app/models/pet.model';
import { Data } from '@angular/router';

@Component({
  selector: 'app-pets-page',
  templateUrl: './pets-page.component.html'
})
export class PetsPageComponent implements OnInit {

  public pets$: Observable<Pet[]> = null;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.pets$ = this.dataService.getPets();
  }
}
