import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

nameControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
surnameControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
emailControl = new FormControl(null, [Validators.required, Validators.email]); 
passwordControl = new FormControl(null, [Validators.required, Validators.minLength(8)]);

  userForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl,
  })

}
