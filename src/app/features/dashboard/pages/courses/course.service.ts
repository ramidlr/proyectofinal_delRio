// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, of, take } from 'rxjs';
// import { Course, CreateCourseData, UpdateCourseData } from './models';

// const COURSE_DB: Observable<Course[]> = of([
//   {
//     id: 1,
//     name: 'Angular',
//     description: 'Angular de cero a experto: Online On-Demand',
//     credits: 40,
//     price: 120
//   }, {
//     id: 2,
//     name: 'React',
//     description: 'React Experto: En Vivo',
//     credits: 43,
//     price: 250
//   }, {
//     id: 3,
//     name: 'Full-Stack Developer 2023',
//     description: 'Curso completo de Angular, React, HTML, CSS y proyecto final en empresa',
//     credits: 60,
//     price: 1900
//   },
//   {
//     id: 4,
//     name: 'UX-UI',
//     description: 'Diseno UX - UI: Full-Time Intensivo',
//     credits: 40,
//     price: 300
//   },
//   {
//     id: 5,
//     name: 'CS-50: Harvard',
//     description: 'Curso de Introduccion a la Programacion: Presencial y en Vivo',
//     credits: 10,
//     price: 99
//   },
// ]);


// @Injectable({
//   providedIn: 'root'
// })
// export class CourseService {
//   private _courses$ = new BehaviorSubject<Course[]>([]);
//   private courses$ = this._courses$.asObservable();


//   constructor() { }


//   loadCourses(): void {
//     COURSE_DB.subscribe({
//       next: (coursesFromDb) => this._courses$.next(coursesFromDb),
//     });
//   }

//   getCourses(): Observable<Course[]> {
//     return this.courses$;
//   }


//   createCourse(course: CreateCourseData): void {
//     this.courses$.pipe(take(1)).subscribe({
//       next: (arrayActual) => {
//         this._courses$.next([
//           ...arrayActual,
//           { ...course, id: arrayActual.length + 1 },
//         ]);
//       },
//     });
//   }

//   editCourse(id: number, cursoActualizado: UpdateCourseData): void {
//     this.courses$.pipe(take(1)).subscribe({
//       next: (arrayActual) => {
//         this._courses$.next(
//           arrayActual.map((u) =>
//             u.id === id ? { ...u, ...cursoActualizado } : u
//           )
//         );
//       },
//     });
//   }


//   deleteCourse(id: number): void {
//     this.courses$.pipe(take(1)).subscribe({
//       next: (arrayActual) =>
//         this._courses$.next(arrayActual.filter((u) => u.id !== id)),
//     });
//   }










// }
