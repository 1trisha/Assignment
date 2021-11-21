import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  group: FormGroup;
  constructor(private loginService: AuthService, private router: Router) {
    this.group = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }
  onLoginClick() {
    this.loginService
      .verify(this.group.value.username, this.group.value.password)
      .subscribe(
        (tokenObject: { token: string }) => {
          localStorage.setItem('token', tokenObject.token);
          let currentDate = new Date();
          localStorage.setItem(
            'expiry-time',
            new Date(currentDate.getTime() + 30 * 60000).toString()
          );
          this.router.navigate(['home']);
        },
        (error: any) => {
          console.error(error);
        }
      );
  }
}
