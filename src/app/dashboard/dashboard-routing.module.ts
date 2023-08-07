import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";


@NgModule({
    imports: [

        RouterModule.forChild([

            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'usuarios',
                loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule),
            },
            {
                path: 'cursos',
                loadChildren: () => import('./pages/courses/courses.module').then((m) => m.CoursesModule),
            }, {
                path: 'clases',
                loadChildren: () => import('./pages/goals/goals.module').then((m) => m.GoalsModule),
            },
            {
                path: '**',
                redirectTo: 'home',
            }
        ])],
    exports: [RouterModule]
})

export class DashboardRoutingModule { }




