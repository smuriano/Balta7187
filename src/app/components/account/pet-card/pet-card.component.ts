import { Component, OnInit, Input } from '@angular/core';

import { Pet } from 'src/app/models/pet.model';


@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html'
})
export class PetCardComponent implements OnInit {

  @Input() pet: Pet;

  constructor() { }

  ngOnInit(): void {
  }

}
