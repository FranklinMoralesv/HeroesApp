import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { SearchComponent } from './pages/search/search.component';
import { HeroeComponent } from './pages/hero/hero.component';
import { ErrorPageComponent } from '../shared/error-page/error-page.component';


const routes:Routes=[
  {
    path:'',
    component:HomeComponent,
    children:[
      {
        path:'list',
        component:ListComponent
  
      },
      {
        path:'add',
        component:AddComponent
  
      },
      {
        path:'edit/:id',
        component:AddComponent
      },
      {
        path:'search',
        component:SearchComponent
  
      },
      {
        path:':id',
        component:HeroeComponent
  
      },
      {
        path:'**',
        redirectTo:'list'
      },
    ]
  }
  ];
  
  @NgModule({
    
    imports: [
      RouterModule.forChild(routes)
    ],
    exports:[
      RouterModule
    ]
  })
  export class HeroesRoutingModule { }
  