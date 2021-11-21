import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent {
  public nav = [
    {
      titleKey: 'app_nav_home',
      path: '/home'
    }
  ];
  constructor(private authService: AuthService, private router: Router) {}
  onLogout() {
    this.authService.logOut().then((value: boolean) => {
      this.router.navigate(['login']);
    });
  }
}
