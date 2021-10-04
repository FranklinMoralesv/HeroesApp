import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  searchTerms:string='';
  heroes:Heroe[]=[];
  heroesIds:string[]=[];
  currentIndex:number=0;
  
  heroSelected!:Heroe |undefined;
  constructor(private heroesService:HeroesService,private router:Router) { }

  ngOnInit(): void {
  }

  searching(){
  //TODO:Validar mayusculas minusculas
  this.heroesService.getSuggestions(this.searchTerms.toLocaleLowerCase())
    .subscribe(heroes=>{
      //console.log('Searching...',heroes);
      console.log('Searching...');
      this.heroes=Object.values<Heroe>(heroes);
      this.heroesIds=Object.keys(heroes);
    });
  }

  optionSelected(event:MatAutocompleteSelectedEvent){
    
    if(event.option.value===''){
      return
    }

    if(!event.option.value){
      this.heroSelected=undefined;
      return
    }

    const hero:Heroe=event.option.value;
  
    
    this.searchTerms=hero.superhero;


    this.heroesService.getHeroById(this.heroesIds[this.currentIndex])
    .subscribe(hero=>
      {
        this.heroSelected=hero;
        this.router.navigate(['/heroes',this.heroesIds[this.currentIndex]])
      });
    
  }

  updateIndex(i:number){
    this.currentIndex=i;
  }

}
