import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models/model';

const ELEMENT_DATA: User[] = [{
  id: 1, name: 'Marcos', surname: 'Z', email: 'mail@hotmail.com', password: '123456',
}, {
  id: 1, name: 'Marcos', surname: 'Z', email: 'mail@hotmail.com', password: '123456',
},{
  id: 1, name: 'Marcos', surname: 'Z', email: 'mail@hotmail.com', password: '123456',
}
];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {


public users: User[] = ELEMENT_DATA;

  constructor(
    private matDialog: MatDialog
  ) {}

  //onCreateUser abre el formulario
  onCreateUser():void {
    const dialogRef = this.matDialog.open(UserFormDialogComponent);
//abro el modal, y luego de que se cierra x la forma que sea, envio la informacion.
    dialogRef.afterClosed().subscribe({
      next: (v) =>  { 
        if(v) {
          this.users = [...this.users,
            {
              id: this.users.length + 1,
              name: v.name,
              surname: v.surname,
              email: v.email,
              password: v.password,
            }
          ]
        
        console.log('Recibimos el valor: ', v)
      } else {
        console.log('Evento cancelado')
      }
      }
    });
  }
}
