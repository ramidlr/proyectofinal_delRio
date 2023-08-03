import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './classes.component';
import { ClassFormDialogComponent } from './components/class-form-dialog/class-form-dialog.component';
import { ClassesTableComponent } from './components/classes-table/classes-table.component';



@NgModule({
  declarations: [
    ClassesComponent,
    ClassFormDialogComponent,
    ClassesTableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ClassesModule { }
