import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styles: [
    `
    mat-card{
      margin-top:20px;
      cursor:pointer;
    }
    `
  ]
})
export class HeroeCardComponent implements OnInit {

  @Input() heroe!:Heroe ;
  @Input() id!:string;

  
  constructor() { }

  ngOnInit(): void {
    //this.heroe.id=this.id;
  }

}
