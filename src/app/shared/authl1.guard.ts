import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardL1 implements CanLoad {
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
        if(user['accessLevel'] == 1 && url.includes('/medico')){
          return true;
        }
        else if(user['accessLevel'] == 2){
          return true;
        }
        else if(user['accessLevel'] == 0){
          this.router.navigate(['/paciente']);
          return false;
        }
        else{
          return false;
        }
      })
    )
    }
}