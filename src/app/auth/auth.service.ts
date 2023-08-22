import { Injectable } from "@angular/core";
import { LoginPayload } from "./models";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { User } from "../features/dashboard/pages/users/models/modelusers";
import { NotifierService } from "../core/services/notifier.service";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Store } from "@ngrx/store";
import { AuthActions } from "../store/auth/auth.actions";
import { selectAuthUser } from "../store/auth/auth.selector";

@Injectable({ providedIn: 'root' })
export class AuthService {

    public authUser$ = this.store.select(selectAuthUser)

    constructor(private notifier: NotifierService, private router: Router, private httpClient: HttpClient, private store: Store) { }

    isAuthenticated(): Observable<boolean> {
        return this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
            params: {
                token: localStorage.getItem('token') || '',
            }
        }).pipe(
            map((usersResult) => {

                if (usersResult.length) {
                    const authUser = usersResult[0];
                    // valid Login
                    this.store.dispatch(AuthActions.setAuthUser({ payload: authUser }));
                }

                return !!usersResult.length
            })
        )
    }


    login(payload: LoginPayload): void {
        this.httpClient.get<User[]>('http://localhost:3000/users', {
            params: {
                email: payload.email || '',
                password: payload.password || ''
            }
        }).subscribe({
            next: (response) => {
                if (response.length) {
                    //valid login
                    const authUser = response[0];
                    // this._authUser$.next(authUser);
                    this.store.dispatch(AuthActions.setAuthUser({ payload: authUser }))
                    this.router.navigate(['/dashboard']);
                    localStorage.setItem('token', authUser.token)
                } else {
                    //invalid Login
                    this.notifier.showError('Email o contrasena invalida');
                    // this._authUser$.next(null);
                    this.store.dispatch(AuthActions.setAuthUser({ payload: null }))

                }
            },
            error: (err) => {
                if (err instanceof HttpErrorResponse) {

                    this.notifier.showError('Error http')


                }
            }
        })

    }


    public logout() {
        this.store.dispatch(AuthActions.setAuthUser({ payload: null }))
    }
}