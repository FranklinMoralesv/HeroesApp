import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../interfaces/heroes.interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class HeroesService {

 
  private baseUrl:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  
   //TODO:Agregar Tipado a las respuestas del backend que faltan
  getHeroes(){
    return  this.http.get<any>(`${this.baseUrl}/heroes.json`);
  }

 
  getHeroById(id:string){
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}.json`);
  }
 

  getSuggestions(query:string){
    return this.http.get<any>(`${this.baseUrl}/heroes.json?orderBy="superhero"&startAt="${query}"&limitToFirst=5`);
  }

  addHero(heroe:Heroe):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/heroes.json`,heroe);
  }

  
  updateHero(heroe:Heroe,id:string):Observable<Heroe>{
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${id}.json`,heroe);
  }
  deleteHero(id:string):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/heroes/${id}.json`);
  }




  
}
