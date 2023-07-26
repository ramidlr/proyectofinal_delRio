import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './models/model';
import { BehaviorSubject, Observable, of, take } from 'rxjs';

const USER_DB: Observable<User[]> = of([
  {
    id: 1,
    dni: '90882735',
    name: 'Marcos',
    surname: 'Barrenechea',
    email: 'marcos32@hotmail.com',
    course: 'Angular',
    password: '123456',
  },
  {
    id: 2,
    dni: '38992781',
    name: 'Pedro',
    surname: 'Zabaleta',
    email: 'zabaleta@gmail.com',
    course: 'UX',
    password: '123456',
  },
  {
    id: 3,
    dni: '40009087',
    name: 'Jonathan',
    surname: 'Gonzalez',
    email: 'j_gonzalez90@hotmail.com',
    course: 'React',
    password: '123456',
  },
]);

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  constructor() {}

  loadUsers(): void {
    USER_DB.subscribe({
      next: (usuariosFromDb) => this._users$.next(usuariosFromDb),
    });
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  createUser(user: CreateUserData): void {
    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next([
          ...arrayActual,
          { ...user, id: arrayActual.length + 1 },
        ]);
      },
    });
  }

  editUser(id: number, usuarioActualizado: UpdateUserData): void {
    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next(
          arrayActual.map((u) =>
            u.id === id ? { ...u, ...usuarioActualizado } : u
          )
        );
      },
    });
  }

  deleteUser(id: number): void {
    this._users$.pipe(take(1)).subscribe({
      next: (arrayActual) =>
        this._users$.next(arrayActual.filter((u) => u.id !== id)),
    });
  }
}
