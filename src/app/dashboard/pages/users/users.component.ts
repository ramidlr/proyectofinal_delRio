import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models/model';
import { UserService } from './user.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Observable, map } from 'rxjs';

// const ELEMENT_DATA: User[]
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users: Observable<User[]>;

  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    private notifier: NotifierService
  ) {
    this.users = this.userService.getUsers().pipe(
      map((valor) =>
        valor.map((usuario) => ({
          ...usuario,
          name: usuario.name.toLowerCase(),
          surname: usuario.surname.toUpperCase(),
        }))
      )
    );

    this.userService.loadUsers();
    // this.userService.getUsers().subscribe({
    //   next: (v) => {
    //     this.users = v;
    //   },
    // });
  }

  onCreateUser(): void {
    const dialogRef = this.matDialog.open(UserFormDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v) {
          this.notifier.createSuccess('Alumno creado correctamente');
          this.userService.createUser({
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
      // this.users = this.users.filter((u) => u.id !== userToDelete.id);
      this.notifier.deleteSuccess('Alumno eliminado correctamente');
  }

  editUser(userToEdit: User): void {
    const dialogRef = this.matDialog.open(UserFormDialogComponent, {
      data: userToEdit,
    });
    dialogRef.afterClosed().subscribe({
      next: (datanueva) => {
        if (datanueva) {
          this.notifier.editSuccess('Has editado los datos correctamente');

          // this.users = this.users.map((user) => {
          //   return user.id === userToEdit.id ? { ...user, ...datanueva } : user;
          // });
        }
      },
    });
  }
}
