import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { UsersComponent } from "./pages/users/users.component";
import { UserDetailComponent } from "./pages/users/pages/user-detail/user-detail.component";
import { CoursesModule } from './pages/courses/courses.module';
import { GoalsModule } from './pages/goals/goals.module';

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
                path: '**',
                redirectTo: 'home',
            },
        ]),
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }