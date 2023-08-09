import { Injectable } from "@angular/core";
import { LoginPayload } from "./models";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { User } from "../features/dashboard/pages/users/models/model";
import { NotifierService } from "../core/services/notifier.service";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private _authUser$ = new BehaviorSubject<User | null>(null);
    public authUser$ = this._authUser$.asObservable();

    constructor(private notifier: NotifierService, private router: Router, private httpClient: HttpClient) { }

    isAuthenticated(): Observable<boolean> {
        return this.authUser$.pipe(take(1), map((user) => !!user))
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
                    this._authUser$.next(response[0]);
                    this.router.navigate(['/dashboard']);
                } else {
                    this.notifier.showError('Email o contrasena invalida');
                    this._authUser$.next(null);
                }
            }
        })

    }

}