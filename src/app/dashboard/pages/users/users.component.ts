import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  constructor(
    private matDialog: MatDialog
  ) {}

  //onCreateUser abre el formulario
  onCreateUser():void {
    const dialogRef = this.matDialog.open(UserFormDialogComponent);
//abro el modal, y luego de que se cierra x la forma que sea, envio la informacion.
    dialogRef.afterClosed().subscribe({
      next: (v) => 
      
      { if(v) {
        console.log('Recibimos el valor', v)
      } else {
        console.log('Evento cancelado')
      }
      }
    });
  }
}
