import { Injectable } from '@angular/core';
import { CreateStudentData, UpdateStudentData, Student } from './models/modelstudents';
import { BehaviorSubject, Observable, generate, map, mergeMap, of, take } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { generateRandomString } from 'src/app/shared/utils/helpers';
import { environment } from 'src/environments/environment';
import { Course } from '../courses/models';



@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private _students$ = new BehaviorSubject<Student[]>([]);
  private students$ = this._students$.asObservable();
  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();


  constructor(private httpClient: HttpClient, private notifier: NotifierService) { }

  loadStudents(): void {
    this._isLoading$.next(true);
    this.httpClient.get<Student[]>(environment.baseApiUrl + '/students', {
      headers: new HttpHeaders({ 'token': '123456' }), params: {
        page: 1,
        limit: 50,
      }
    }).subscribe({
      next: (response) => {
        this._students$.next(response);
      },
      error: () => {
        this.notifier.showError('Error del servidor')
      },
      complete: () => {
        this._isLoading$.next(false);
      }
    })
  }

  getStudents(): Observable<Student[]> {
    return this.students$;
  }

  getStudentById(id: number) {
    return this.students$.pipe(take(1),
      map((students) => students.find((u) => u.id === id))
    )
  }


  createStudent(payload: CreateStudentData): void {
    const token = generateRandomString(20);

    this.httpClient.post<Student>(environment.baseApiUrl + '/students', { ...payload, token })
      .pipe(
        mergeMap((studentCreate) => this.students$.pipe(
          take(1),
          map((arrayActual) => [...arrayActual, studentCreate])
        )
        )
      )
      .subscribe({
        next: (arrayActualizado) => {
          this._students$.next(arrayActualizado)
        }
      })
  }
  editStudent(id: number, alumnoActualizado: UpdateStudentData): void {
    this.httpClient.put(environment.baseApiUrl + '/students/' + id, alumnoActualizado).subscribe({
      next: () => this.loadStudents(),
    })
  }

  deleteStudent(id: number): void {
    this.httpClient.delete(environment.baseApiUrl + '/students/' + id)
      .pipe().subscribe({
        next: (arrayActualizado) => this.loadStudents(),
      })
  }


  getStudentsByCategoryId(categoryId: number): Observable<Student[]> {
    return this.httpClient.get<Student[]>(environment.baseApiUrl + `/students?categoryId=${categoryId}`)
  }


}


