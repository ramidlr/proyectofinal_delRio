import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { selectAuthUserAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {

  public selectAuthUserAdmin$: Observable<boolean>

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store
  ) { 
    this.selectAuthUserAdmin$ = this.store.select(selectAuthUserAdmin)

  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['auth', 'login']);
  }
}
