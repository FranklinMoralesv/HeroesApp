import { AfterContentInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
    `
  
    .list__title{
      margin:1rem 0;
      padding:1rem 0;
      font-size:2rem;
    }

    @media (min-width:  768px){
      .list__title{
      font-size:4rem;
    }
       
    }
    `
  ]
})
export class ListComponent implements OnInit {

  constructor(private heroesService:HeroesService,private router:Router) { }
  
  

  heroes:Heroe[]=[];
  heroesIds:string[]=[];

  

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe(heroes=>
        {

          
          this.heroesIds=Object.keys(heroes);
          this.heroes=Object.values<Heroe>(heroes);
          
        }
      );
      
  }

  goToHero(id:string){
    this.router.navigate(['./heroes/',id]);
  }

}
