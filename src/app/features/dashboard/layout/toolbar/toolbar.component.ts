import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../pages/users/models/model';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../../../store/auth/auth.selector';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input()
  public drawer?: MatDrawer;
  public authUser$: Observable<User | null>;

  constructor(private authService: AuthService, private store: Store) {
    this.authUser$ = this.store.select(selectAuthUser);
  }
}
