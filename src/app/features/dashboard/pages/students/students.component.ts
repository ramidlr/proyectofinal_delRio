import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';
import { Student } from './models/modelstudents';
import { StudentService } from './student.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  public students: Observable<Student[]>;
  public isLoading$: Observable<boolean>;
  public isAdmin$: Observable<boolean>

  constructor(
    private matDialog: MatDialog,
    private studentService: StudentService,
    private notifier: NotifierService,
    private store: Store
  ) {
    this.isAdmin$ = this.store.select(selectIsAdmin)
    this.studentService.loadStudents();
    this.isLoading$ = this.studentService.isLoading$;
    this.students = this.studentService.getStudents().pipe(
      map((valor) =>
        valor.map((student) => ({
          ...student,
          name: student.name.toLowerCase(),
          surname: student.surname.toUpperCase(),
        }))
      )
    );
  }

  onCreateStudent(): void {
    const dialogRef = this.matDialog.open(StudentFormDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v) {
          this.notifier.showSuccess('Alumno creado correctamente');
          this.studentService.createStudent({
            dni: v.dni,
            name: v.name,
            surname: v.surname,
            email: v.email,
            course: v.course,
            password: v.password,
          });
        }
      },
    });
  }

  onDeleteStudent(studentToDelete: Student): void {
    if (confirm('Estas seguro que deseas eliminar al alumno?'))
      this.notifier.showSuccess('Alumno eliminado correctamente');
    this.studentService.deleteStudent(studentToDelete.id);
  }

  editStudent(studentToEdit: Student): void {
    const dialogRef = this.matDialog.open(StudentFormDialogComponent, {
      data: studentToEdit,
    });
    dialogRef.afterClosed().subscribe({
      next: (studentUpdated) => {
        if (studentUpdated) {
          this.studentService.editStudent(studentToEdit.id, studentUpdated);
          this.notifier.showSuccess('Has editado los datos correctamente');
        }
      },
    });
  }
}
