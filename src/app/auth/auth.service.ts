import { Injectable } from "@angular/core";
import { LoginPayload } from "./models";
import { BehaviorSubject, Observable, map, take } from "rxjs";
import { User } from "../features/dashboard/pages/users/models/model";
import { NotifierService } from "../core/services/notifier.service";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class AuthService {

    private _authUser$ = new BehaviorSubject<User | null>(null);
    public authUser$ = this._authUser$.asObservable();

    constructor(private notifier: NotifierService, private router: Router) { }

    isAuthenticated(): Observable<boolean> {
        return this.authUser$.pipe(take(1), map((user) => !!user))
    }

    login(payload: LoginPayload): void {
        const MOCK_USER: User = {
            id: 50,
            dni: '46196059',
            name: 'John',
            surname: 'McCain',
            email: 'mail@mail.com',
            course: 'React',
            password: '123456'
        }

        if (payload.email === MOCK_USER.email && payload.password === MOCK_USER.password) {
            this._authUser$.next(MOCK_USER);
            this.router.navigate(['/dashboard'])
        } else {
            this.notifier.showError('Email o contrasena invalida. Intenta nuevamente')
            this._authUser$.next(null);
        }

    }

}