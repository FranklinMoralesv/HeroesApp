import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,  CanLoad {

  constructor(private authService:AuthService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {


      return this.authService.verifyAccess().pipe(
          tap(accessGranted=>{
            if(!accessGranted){
              this.router.navigate(['./auth/login']);
              console.log('Access Denied Blocked By AuthGuard - CanActivate');
            }
          })
      );

  }
  canLoad(//Solo sirve para prevenir que el usuario cargue el modulo
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {


      return this.authService.verifyAccess().pipe(
        tap(accessGranted=>{
          if(!accessGranted){
            this.router.navigate(['./auth/login']);
            console.log('Access Denied Blocked By AuthGuard - CanLoad');
          }
        })
    );

  }
}
