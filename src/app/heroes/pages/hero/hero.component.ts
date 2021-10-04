import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [
    `
    @media (min-width:  768px){
    
      .hero__title{
      font-size:3rem;
    }
      .hero__item{
      font-size:1.2rem;
      }

      .hero__button{
        font-size:2rem;
      }
    }
    `
  ]
})
export class HeroeComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private heroesService:HeroesService,private router:Router) { }

  hero!:Heroe;

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        ({id})=>{
          //console.log('id heroe',id);
          this.heroesService.getHeroById(id)
            .subscribe((hero)=>
              {
                this.hero=hero;
              });

        }
      );






      this.activatedRoute.params
      .subscribe(resp=>{
          //console.log('Parametros',resp)
        }
        
      );
  }

  goBack(){
    this.router.navigate(['/heroes/list']);
  }

}
