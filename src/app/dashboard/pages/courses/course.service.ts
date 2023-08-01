import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from './models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses$ = new BehaviorSubject<Course[]>([]);

  constructor() { }

  getCourses(): Observable<Course[]> {
    return this.courses$.asObservable();
  }


  loadCourses(): void {
    this.courses$.next([
      {
        id: 1,
        name: 'Angular',
        description: 'Angular de cero a experto: Online On-Demand',
        credits: 40,
        price: 120
      }, {
        id: 2,
        name: 'React',
        description: 'React Experto: En Vivo',
        credits: 43,
        price: 250
      }, {
        id: 3,
        name: 'Full-Stack Developer 2023',
        description: 'Curso completo de Angular, React, HTML, CSS y proyecto final en empresa',
        credits: 60,
        price: 1900
      },
      {
        id: 4,
        name: 'UX-UI',
        description: 'Diseno UX - UI: Full-Time Intensivo',
        credits: 40,
        price: 300
      },
      {
        id: 5,
        name: 'CS-50: Harvard',
        description: 'Curso de Introduccion a la Programacion: Presencial y en Vivo',
        credits: 10,
        price: 99
      }
    ])
  }
}
