import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

interface MyCustomNotification {
  type: 'success' | 'error';
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  private notifier$ = new Subject<MyCustomNotification>();
  constructor() {
    this.notifier$.subscribe({
      next: (myNotification) => {
        Swal.fire(
          myNotification.title,
          myNotification.message,
          myNotification.type
        );
      },
    });
  }

  createSuccess(message: string, title = ':)'): void {
    this.notifier$.next({
      type: 'success',
      message,
      title,
    });
  }

  editSuccess(message: string, title = 'Editar alumno'): void {
    this.notifier$.next({
      type: 'success',
      message,
      title,
    });
  }

  editError(message: string, title = 'Error'): void {
    this.notifier$.next({
      type: 'error',
      message,
      title,
    });
  }

  deleteSuccess(message: string, title = 'Eliminado'): void {
    this.notifier$.next({
      type: 'success',
      message,
      title,
    });
  }
}
