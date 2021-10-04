import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, tap} from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,
    private router:Router) { }

  private baseUrl:string=environment.baseUrl;
  private _auth:Auth|undefined|null;



  get auth(){
    return {...this._auth};
  }

  login(email:string,inputPassword:string):Observable<boolean>{
    return this.getUserByEmail(email).pipe(
      map(resp=>{
    
        if(resp===null){
          //console.log('AuthService: No existe el Usuario',resp);
          return false;
        }
        
        const authResponseValues:Auth[]=Object.values(resp);
        const authResponseKeys=Object.keys(resp);
        
        //console.log('el key es ',authResponseKeys[0]);
        
        const auth=authResponseValues[0];
        const userIdToken=authResponseKeys[0];
        
        if(auth.password==inputPassword){
          this._auth=auth;
          //Simulando que guardo un jwt
         localStorage.setItem('userIdToken',userIdToken);
         return true;
          
        }
        return false;
        
      })
    );
  }

  logout(){
    this._auth=null;
    localStorage.removeItem('userIdToken');
  }

  register(newUser:Auth):Observable<string>{
    return this.getUserByEmail(newUser.email).
      pipe(
        map(resp=>{
          let status:string;
          if(resp===null){
            //significa que no esta registrado el usuario
            
            
           console.log('New User Added');
            status='Usuario agregado';
            this.addUser(newUser).subscribe(
              resp=>{
                //console.log('New user added',resp);
              
                //simulando que guardo un JWT
                const {name}=resp;
                localStorage.setItem('userIdToken',name);
                this.router.navigate(['./heroes']);
                
               
              }
            );
            return status;
          }else{

            status='El email ya se encuentra registrado';
            console.log('Email is already in use!');
          }
          return status;

        })
      );
  }

  verifyAccess():Observable<boolean> {
    
    if(!localStorage.getItem('userIdToken')){
      return of(false);//se transforma en observable
    }
    const userId=localStorage.getItem('userIdToken');
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/${userId}.json`)
    .pipe(
      map(auth=>{
        // console.log('auth veriffy acces',auth);
        if(auth===null){
          return false;
        }
        this._auth=auth;
         return true;
      })
    );
  
  }


    //usuarios
    addUser(user:Auth):Observable<any>{
      return this.http.post<any>(`${this.baseUrl}/usuarios.json`,user);
    }
    getUsers():Observable<any>{
      return  this.http.get<any>(`${this.baseUrl}/usuarios.json`);
    }
    getUserByEmail(email:string):Observable<any| null>{
      return  this.http.get<any>(`${this.baseUrl}/usuarios.json?orderBy="email"&limitToFirst=1&startAt="${email}"&endAt="${email}"`);
    }
  
   

   
}
