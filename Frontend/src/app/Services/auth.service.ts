import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor() {}

  public verify(username: string, password: string) {
    return timer(1000).pipe(
      map((_) => {
        if (username == 'Trisha' && password == '1234') {
          return { token: 'token123' };
        } else {
          throw new Error('credentials not valid');
        }
      })
    );
  }

  public getAuthStatus(): boolean {
    const currentDate = new Date();
    if (currentDate > new Date(localStorage.getItem('expiry-time'))) {
      return false;
    }
    if (
      !localStorage.getItem('token') ||
      localStorage.getItem('token') === ''
    ) {
      return false;
    }
    return true;
  }
  public logOut(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      localStorage.clear();
      resolve(true);
    });
  }
}
