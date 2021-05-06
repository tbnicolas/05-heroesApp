import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService,
               private router: Router){}




  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

     /* if ( this.authService.auth.id != undefined ) {

        return true;

      } else{

        console.log('Bloqueado por el AuthGuard - canActivate');
        return false;

      } */
      return this.authService.verificaAutenticacion()
      .pipe(
        tap( estaAutenticado => {
          if ( !estaAutenticado ) {
            this.router.navigate(['./auth/login']);
          }
        })
      );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      /* console.log('canLoad', true);
      console.log(route);
      console.log(segments); */

      return this.authService.verificaAutenticacion()
          .pipe(
            tap( estaAutenticado => {
              if ( !estaAutenticado ) {
                this.router.navigate(['./auth/login']);
              }
            })
          );

      /* if ( this.authService.auth.id != undefined ) {

        return true;

      } else{

        console.log('Bloqueado por el AuthGuard - CanLoad');
        return false;

      } */

  }
}
