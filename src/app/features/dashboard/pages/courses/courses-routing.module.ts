import { NgModule } from '@angular/core';
import { CoursesComponent } from './courses.component';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';

const routes: Routes = [
    {
        path: '',
        component: CoursesComponent,
    },
    {
        path: ':id',
        component: CourseDetailComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoursesRoutingModule { }
