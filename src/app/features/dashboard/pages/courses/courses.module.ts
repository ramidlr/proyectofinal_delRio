import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
// import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
// import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './store/courses.effects';
import { coursesFeature } from './store/courses.reducer';
import { StoreModule } from '@ngrx/store';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';



@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailComponent,
    // CourseFormDialogComponent,
    // CoursesTableComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule,
    StoreModule.forFeature(coursesFeature),
    EffectsModule.forFeature([CoursesEffects])
  ]
})
export class CoursesModule { }
