import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';
import { Student, CreateStudentData } from './models/model';
import { StudentService } from './student.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Observable, Subject, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  public students: Observable<Student[]>;
  public isLoading$: Observable<boolean>;

  constructor(
    private matDialog: MatDialog,
    private studentService: StudentService,
    private notifier: NotifierService
  ) {
    this.studentService.loadStudents();
    this.isLoading$ = this.studentService.isLoading$;
    this.students = this.studentService.getStudents().pipe(
      map((valor) =>
        valor.map((usuario) => ({
          ...usuario,
          name: usuario.name.toLowerCase(),
          surname: usuario.surname.toUpperCase(),
        }))
      )
    );
  }

  onCreateStudent(): void {
    const dialogRef = this.matDialog.open(StudentFormDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v) {
          this.notifier.showSuccess('Usuario creado correctamente');
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
    if (confirm('Estas seguro que deseas eliminar al usuario?'))
      this.notifier.showSuccess('Usuario eliminado correctamente');
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
