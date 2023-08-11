import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public emailControl = new FormControl('lycesevix@mailinator.com', [Validators.required, Validators.email]);
  public passwordControl = new FormControl('Pa$$w0rd!', Validators.required);



  public loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  })

  constructor(private authService: AuthService) { }


  login(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.authService.login(this.loginForm.getRawValue())
    }

  }

}
