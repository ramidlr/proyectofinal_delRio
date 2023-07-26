import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User, CreateUserData } from './models/model';
import { UserService } from './user.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Observable, Subject, map, takeUntil } from 'rxjs';

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
    this.userService.loadUsers();
    this.users = this.userService.getUsers().pipe(
      map((valor) =>
        valor.map((usuario) => ({
          ...usuario,
          name: usuario.name.toLowerCase(),
          surname: usuario.surname.toUpperCase(),
        }))
      )
    );
  }

  onCreateUser(): void {
    const dialogRef = this.matDialog.open(UserFormDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v) {
          this.notifier.showSuccess('Alumno creado correctamente');
          this.userService.createUser({
            dni: v.dni,
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
      this.notifier.showSuccess('Alumno eliminado correctamente');
    this.userService.deleteUser(userToDelete.id);
  }

  editUser(userToEdit: User): void {
    const dialogRef = this.matDialog.open(UserFormDialogComponent, {
      data: userToEdit,
    });
    dialogRef.afterClosed().subscribe({
      next: (userUpdated) => {
        if (userUpdated) {
          this.userService.editUser(userToEdit.id, userUpdated);
          this.notifier.showSuccess('Has editado los datos correctamente');
        }
      },
    });
  }
}
