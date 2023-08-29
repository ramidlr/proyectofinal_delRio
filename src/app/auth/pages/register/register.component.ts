import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public emailControl = new FormControl('', [Validators.required, Validators.email]);
  public passwordControl = new FormControl('', Validators.required);

  public registerForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  })

  constructor(private authService: AuthService) { }


  register(): void {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.authService.login(this.registerForm.getRawValue())
    }

  }

}
