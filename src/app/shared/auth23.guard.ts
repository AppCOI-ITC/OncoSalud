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
        console.log(user);
        if(user['isAdmin'] == 0){
          return true;
        }
        else if (user['isAdmin'] == 1){
          this.router.navigate(['/doctor/home'])
          return false;
        }else{
          this.router.navigate(['/login']);
          return false;
        }
      })
    )
  }
  
}
