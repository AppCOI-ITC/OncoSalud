import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authSvc: AuthService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authSvc.user$.pipe(
      take(1),
      map((user) => {
        const navigation = this.router.getCurrentNavigation()
        let url = navigation.extractedUrl.toString();
        console.log(url);
        console.log(url.includes('/paciente'));
        if(user['isAdmin'] == 0 && url.includes('/paciente')){
          return true;
        }
        else if(user['isAdmin'] == 1 && url.includes('/doctor')){
          return true;
        }
        else{
          return false;
        }
      })
    )
    }
}
