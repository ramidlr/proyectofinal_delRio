import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models/model';
import { UserService } from './user.service';

// const ELEMENT_DATA: User[]
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users: User[] = [];

  constructor(private matDialog: MatDialog, private userService: UserService) {
    this.userService.loadUsers();
    this.userService.getUsers().subscribe({
      next: (v) => {
        this.users = v;
      },
    });
  }

  onCreateUser(): void {
    const dialogRef = this.matDialog.open(UserFormDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v) {
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
}
