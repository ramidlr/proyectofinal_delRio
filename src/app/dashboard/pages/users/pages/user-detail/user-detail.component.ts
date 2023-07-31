import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../models/model';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [],
})
export class UserDetailComponent {
  public user: User | null = null;
  public userId?: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notification: NotifierService,
    private usersService: UserService,
  ) {
    console.log(this.activatedRoute.snapshot.params['id']);
    if (!Number(this.activatedRoute.snapshot.params['id'])) {
      [this.router.navigate(['dashboard', 'alumnos'])];
      this.notification.showError('Usuario invalido');
    } else {
      this.userId = Number(this.activatedRoute.snapshot.params['id']);
      this.loadUser();
    }
  }

  loadUser(): void {
    if (this.userId) {
      this.usersService.getUserById(this.userId).subscribe({next: (user) => console.log(user)})
    }
  }


  //Abajo: podemos usar servicios para lodear info de usuarios por ID. Esos metodos deben estar dentro del UserService.
  //   loadUser(): void {

  //     CourseService.getCourseByUserId(this.activatedRoute.snapshot.params['id']).subscribe({});

  //     UserService.getUserById(this.activatedRoute.snapshot.params['id']).subscribe({
  //     next: (user) => this.user
  //   })
  // }
}
