import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models/model';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

// const ELEMENT_DATA: User[]
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users: User[] = [];

  constructor(private matDialog: MatDialog, private UserService: UserService) {
    this.users = this.UserService.getUsers();
  }

  onCreateUser(): void {
    const dialogRef = this.matDialog.open(UserFormDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v) {
          this.UserService.createUser({
            id: v.id,
            name: v.name,
            surname: v.surname,
            email: v.email,
            course: v.course,
            password: v.password,
          });
        }
      },
    });
  }

  onDeleteUser(userToDelete: User): void {
    if (confirm('Estas seguro que deseas eliminar al alumno?'))
      this.users = this.users.filter((u) => u.id !== userToDelete.id);
  }

  editUser(userToEdit: User): void {
    const dialogRef = this.matDialog.open(UserFormDialogComponent, {
      data: userToEdit,
    });
    dialogRef.afterClosed().subscribe({
      next: (datanueva) => {
        if (datanueva) {
          this.users = this.users.map((user) => {
            return user.id === userToEdit.id ? { ...user, ...datanueva } : user;
          });
        }
      },
    });
  }

  //   //EJEMPLO DE PROMESA

  //   const meDevuelveElDinero = new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(true)
  //     }, 2000);
  //   });

  //   meDevuelveElDinero
  //   .then((value) => console.log(value))
  //   .catch ((error) => alert(error))
  //   .finally(() => { });

  // //EJEMPLO DE OSBERVABLE

  // const semaforo = new Observable((subscriber) => {
  //   let color = 'verde';
  //   setInterval(() => {
  //     if (color === 'verde') {

  //       subscriber.next('rojo');
  //     color = 'rojo'
  //     }

  //   else {
  //     subscriber.next('verde');
  //     color = 'verde'
  //   }
  // }

  // semaforo.subscribe({
  //   next: (color) => {console.log(color)},
  //   error: () => {},
  //   complete: () => {},
  // }

  //
}
