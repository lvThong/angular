import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(public authService: AuthService, public router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any {
    // console.log(this.authService.isLoggedIn());
    if (this.authService.isLoggedIn() === false) {

      alert('Access Denied, you need login!');
      return this.router.navigate(['login']);

    }
    if (this.authService.isAdmin() === false) {

      alert('Access Denied, This user not permission!');

      return this.router.navigate(['home']);
    }

  }
}