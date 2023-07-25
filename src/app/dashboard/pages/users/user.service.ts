import { Injectable } from '@angular/core';
import { User } from './models/model';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
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

  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  constructor() {}

  loadUsers(): void {
    this._users$.next(this.users);
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  createUser(user: User): void {
    this.users = [...this.users, user];
  }
}
