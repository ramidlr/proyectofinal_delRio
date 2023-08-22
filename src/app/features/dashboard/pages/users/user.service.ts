import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './models/modelusers';
import { BehaviorSubject, Observable, generate, map, mergeMap, of, take } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { generateRandomString } from 'src/app/shared/utils/helpers';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();
  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();


  constructor(private httpClient: HttpClient, private notifier: NotifierService) { }

  loadUsers(): void {
    this._isLoading$.next(true);
    this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
      headers: new HttpHeaders({ 'token': '123456' }), params: {
        page: 1,
        limit: 50,
      }
    }).subscribe({
      next: (response) => {
        this._users$.next(response);
      },
      error: () => {
        this.notifier.showError('Error del servidor')
      },
      complete: () => {
        this._isLoading$.next(false);
      }
    })
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getUserById(id: number) {
    return this.users$.pipe(take(1),
      map((users) => users.find((u) => u.id === id))
    )
  }


  createUser(payload: CreateUserData): void {
    const token = generateRandomString(20);

    this.httpClient.post<User>(environment.baseApiUrl + '/users', { ...payload, token })
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
    this.httpClient.put(environment.baseApiUrl + '/users/' + id, usuarioActualizado).subscribe({
      next: () => this.loadUsers(),
    })
  }

  deleteUser(id: number): void {
    this.httpClient.delete(environment.baseApiUrl + '/users/' + id)
      .pipe().subscribe({
        next: (arrayActualizado) => this.loadUsers(),
      })

  }







}


