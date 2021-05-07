import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authSvc.user$.pipe(
      take(1),  
      map((user) => {
        console.log('por aca tambien');
        if(user['isAdmin'] == 0){
          console.log('hola 1');
          return true;
        }
        else if (user['isAdmin'] == 1){
          console.log('hola 2');
          this.router.navigate(['/home-d']);
          return true;
        }else{
          console.log('hola 3');
          this.router.navigate(['/login']);
          return false;
        }
      })
    )
  }
  
}
