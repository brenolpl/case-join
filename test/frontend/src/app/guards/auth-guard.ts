import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, catchError} from 'rxjs';

import { AuthService } from '../service/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {


  constructor(private router: Router, private authService: AuthService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      console.log(route);
      
      if(route.routeConfig?.path !== 'login') {
        return this.authService.isTokenValid().pipe(
            catchError(
                (err) => {
                    return this.router.navigate(['/login']);
                }
            )
        );
      } else {
        return true;
      }
  }
}
