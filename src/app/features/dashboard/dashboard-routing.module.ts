import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { adminGuard } from "src/app/core/guards/admin.guard";


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                // /dashboard/home
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'usuarios',
                canActivate: [adminGuard],
                loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule),
            },
            {
                path: 'cursos',
                loadChildren: () => import('./pages/courses/courses.module').then((m) => m.CoursesModule)
            },
            {
                path: 'clases',
                loadChildren: () => import('./pages/goals/goals.module').then((m) => m.GoalsModule),
            },
            {
                path: 'counter',
                loadChildren: () => import('./pages/counter/counter.module').then((m) => m.CounterModule),
            },
            {
                path: 'alumnos',
                loadChildren: () => import('./pages/students/students.module').then((m) => m.StudentsModule),
            },
            {
                path: 'inscripciones',
                loadChildren: () => import('./pages/inscriptions/inscriptions.module').then((m) => m.InscriptionsModule),
            },
            {
                path: '**',
                redirectTo: 'home',
            },
        ]),
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }