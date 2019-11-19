import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private servicio: DataService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ):
    Observable<boolean | UrlTree> | Promise<boolean |
    UrlTree> | boolean | UrlTree {
      if (this.servicio.isLogged) {
        return true;
      }
      console.log('Acceso denegado!');
      this.router.navigateByUrl('/login');
      return false;
    }
}
