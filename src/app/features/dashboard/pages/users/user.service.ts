import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './models/model';
import { BehaviorSubject, Observable, map, mergeMap, of, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  constructor(private httpClient: HttpClient) { }

  loadUsers(): void {
    this.httpClient.get<User[]>('http://localhost:3000/users').subscribe({
      next: (response) => {
        console.log('response: ', response);
        this._users$.next(response);
      }
    })
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getUserById(id: number): Observable<User | undefined> {
    return this.users$.pipe(take(1),
      map((users) => users.find((u) => u.id === id))
    )
  }



  createUser(payload: CreateUserData): void {
    // this.users$.pipe(take(1)).subscribe({
    //   next: (arrayActual) => {
    //     this._users$.next([
    //       ...arrayActual,
    //       { ...user, id: arrayActual.length + 1 },
    //     ]);
    //   },
    // });

    this.httpClient.post<User>('http://localhost:3000/users', payload)
      .pipe(
        mergeMap((userCreate) => this.users$.pipe(
          take(1),
          map((arrayActual) => [...arrayActual, userCreate])
        )
        )
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._users$.next(arrayActualizado)
        }
      })
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


