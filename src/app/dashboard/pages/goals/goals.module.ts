import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalsComponent } from './goals.component';
import { GoalFormDialogComponent } from './components/goal-form-dialog/goal-form-dialog.component';
import { GoalsTableComponent } from './components/goals-table/goals-table.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    GoalsComponent,
    GoalFormDialogComponent,
    GoalsTableComponent
  ],
  imports: [
    CommonModule, SharedModule
  ]
})
export class GoalsModule { }
