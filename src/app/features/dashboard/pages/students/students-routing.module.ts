import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: StudentsComponent,
      },
      {
        path: 'students/:id',
        component: StudentDetailComponent,
      }
    ])
  ],
  exports: [RouterModule],
})
export class StudentsRoutingModule { }
