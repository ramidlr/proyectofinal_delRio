import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, take } from 'rxjs';
import { CreateGoalData, Goal, UpdateGoalData } from './models/model';


const GOALS_DB: Observable<Goal[]> = of([
  {
    id: 1,
    name: 'Introduccion al Curso',
    studentComments: 'Him rendered may attended concerns.  On inhabiting diminution discovered as. Did friendly eat breeding building few nor. Object he barton no effect played valley afford. Period so to oppose we little seeing or branch. Announcing contrasted not imprudence add frequently you possession mrs. Period saw his houses square and misery.',
  }, {
    id: 2,
    name: 'Introduccion a React',
    studentComments: 'Him rendered may attended concerns.  On inhabiting diminution discovered as. Did friendly eat breeding building few nor. Object he barton no effect played valley afford. Period so to oppose we little seeing or branch. Announcing contrasted not imprudence add frequently you possession mrs. Period saw his houses square and misery.',
  },
  {
    id: 3,
    name: 'rxjs: Servicios y data asincronica',
    studentComments: 'Him rendered may attended concerns.  On inhabiting diminution discovered as. Did friendly eat breeding building few nor. Object he barton no effect played valley afford. Period so to oppose we little seeing or branch. Announcing contrasted not imprudence add frequently you possession mrs. Period saw his houses square and misery.',
  },
  {
    id: 4,
    name: 'Entrevistas Tecnicas: Parte (iii)',
    studentComments: 'Him rendered may attended concerns.  On inhabiting diminution discovered as. Did friendly eat breeding building few nor. Object he barton no effect played valley afford. Period so to oppose we little seeing or branch. Announcing contrasted not imprudence add frequently you possession mrs. Period saw his houses square and misery.',
  }
]);


@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  private _goals$ = new BehaviorSubject<Goal[]>([]);
  private goals$ = this._goals$.asObservable();

  constructor() { }
  loadGoals(): void {
    GOALS_DB.subscribe({
      next: (goalsFromDb) => this._goals$.next(goalsFromDb),
    });
  }

  getGoals(): Observable<Goal[]> {
    return this.goals$;
  }


  createGoal(goal: CreateGoalData): void {
    this.goals$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._goals$.next([
          ...arrayActual,
          { ...goal, id: arrayActual.length + 1 },
        ]);
      },
    })
  }

  editGoal(id: number, goalActualizado: UpdateGoalData): void {
    this.goals$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._goals$.next(
          arrayActual.map((u) =>
            u.id === id ? { ...u, ...goalActualizado } : u
          )
        );
      },
    });
  }


  deleteGoal(id: number): void {
    this.goals$.pipe(take(1)).subscribe({
      next: (arrayActual) =>
        this._goals$.next(arrayActual.filter((u) => u.id !== id)),
    });

  }
}

