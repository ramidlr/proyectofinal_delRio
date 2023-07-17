import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models/model';

const ELEMENT_DATA: User[] = [
  {
    id: '90882735',
    name: 'Marcos',
    surname: 'Barrenechea',
    email: 'marcos32@hotmail.com',
    course: 'Angular',
    password: '123456',
  },
  {
    id: '38992781',
    name: 'Pedro',
    surname: 'Zabaleta',
    email: 'zabaleta@gmail.com',
    course: 'UX',
    password: '123456',
  },
  {
    id: '40009087',
    name: 'Jonathan',
    surname: 'Gonzalez',
    email: 'j_gonzalez90@hotmail.com',
    course: 'React',
    password: '123456',
  },
];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  public users: User[] = ELEMENT_DATA;

  constructor(private matDialog: MatDialog) {}

  onCreateUser(): void {
    const dialogRef = this.matDialog.open(UserFormDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v) {
          this.users = [
            ...this.users,
            {
              id: v.id,
              name: v.name,
              surname: v.surname,
              email: v.email,
              course: v.course,
              password: v.password,
            },
          ];
        }
      },
    });
  }

  onDeleteUser(userToDelete: User): void {
    if (confirm('Confirma que deseas eliminar al alumno ${user.name}?'))
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
