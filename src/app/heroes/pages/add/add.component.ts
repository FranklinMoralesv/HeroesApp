import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
      .goBackButton{
        margin-top:2rem;
        width:100%;
        font-size:1rem;
      }
    `
  ]
})
export class AddComponent implements OnInit {

  publishers=[
    {
      id:'DC Comics',
      desc:'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc:'Marvel - Comics'
    }
  ];

  thereIsId:string|undefined=undefined;

  hero:Heroe={
    superhero:'',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher:Publisher.DCComics,
    alt_img:'',
  }

  constructor(
    private heroesService:HeroesService
    ,private router:Router,
    private activatedRoute:ActivatedRoute,
    private snackBar:MatSnackBar,
    private matDialog:MatDialog) { }

  ngOnInit(): void {
   
    this.activatedRoute.params
      
      .subscribe(params=>{
        if(Object.entries(params).length==0){//Para saber si estoy en edit o add
         this.thereIsId=undefined;
          return;
        }else{
          this.thereIsId=params.id;
          this.heroesService.getHeroById(params.id)
            .subscribe(heroe=>{this.hero=heroe});
        }
      });

  
  }


  saveHero(){

    if(this.hero.superhero.trim().length===0){
      return
    }

    this.heroToLowercase();//para que se mas facil la busqueda
      if(this.thereIsId){
        //Si existe un id signifa que se va a actualizar
        
        this.heroesService.updateHero(this.hero,this.thereIsId)
          .subscribe(heroe=>{
            this.showSnakbar('Registro Actualizado');
            //console.log('Hero has been updated.',heroe)
            console.log('Hero has been updated.');
          });
      }else{
        //Si no existe el id se debe crear otro registro
        this.heroesService.addHero(this.hero)
          .subscribe(
            heroeId=>{//el backend responde con el id :name
              //console.log('new hero has been added',heroeId.name);
              
              this.router.navigate(['/heroes/edit',heroeId.name]);
              this.showSnakbar('Registro Creado');
            });
      }

  }

  deleteHero(){

    const dialog=this.matDialog.open(ConfirmComponent,{
      width:'250px',
      data:{...this.hero}
    });

    dialog.afterClosed().subscribe(
      result=>{
        if(result){
          
            this.heroesService.deleteHero(this.thereIsId!)
            .subscribe(resp=>{
              // console.log('Heroe has been deleted..',this.thereIsId)
              console.log('Heroe has been deleted..');
              this.router.navigate(['/heroes/list']);
            });
        }
      });

   }
   showSnakbar(message:string){
    this.snackBar.open(message,'ok!',{
      duration:2500
    });
   }

   heroToLowercase(){
    this.hero.superhero=this.hero.superhero.toLowerCase();
   }

   goBack(){
    this.router.navigate(['/heroes/list']);
   }

}
