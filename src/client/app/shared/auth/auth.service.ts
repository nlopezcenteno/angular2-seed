import { Injectable }      from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

import { Config } from '../config/env.config';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  lock = new Auth0Lock(Config.Auth0ClientId, Config.Auth0Domain, {
    auth: {
      params: {
        redirect: true,
        redirectUrl: '',
        scope: 'openid name email app_metadata'
      }
    }

  });

  public profile: Object;

  constructor(private router: Router) {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.lock.on('authenticated', (authResult: any) => {
      localStorage.setItem('id_token', authResult.idToken);
      this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
        if (error) {
          console.log(error);
          return;
        }
        localStorage.setItem('profile', JSON.stringify(profile));
        this.profile = profile;
      });
      // this.router.navigate(['/']);
    });
  }

  public login() {
    this.lock.show();
  };

  public authenticated() {
    return tokenNotExpired();
  };

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.profile = undefined;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    if (tokenNotExpired()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
