import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Goal } from './models/model';
import { GoalFormDialogComponent } from './components/goal-form-dialog/goal-form-dialog.component';
import { GoalsService } from './goals.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent {

  public goals: Observable<Goal[]>;


  constructor(
    private matDialog: MatDialog,
    private goalsService: GoalsService,
    private notifier: NotifierService,
  ) {
    this.goalsService.loadGoals();
    this.goals = this.goalsService.getGoals();
  }




  onCreateGoal(): void {
    const dialogRef = this.matDialog.open(GoalFormDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v) {
          this.notifier.showSuccess('Clase creada correctamente');
          this.goalsService.createGoal({
            id: v.id,
            name: v.name,
            studentComments: v.studentComments,
          });
        }
      },
    });
  }

  deleteGoal(goalToDelete: Goal): void {
    if (confirm('Estas seguro que deseas eliminar la clase?'))
      this.notifier.showSuccess('Clase eliminada correctamente');
    this.goalsService.deleteGoal(goalToDelete.id);
  }

  editGoal(goalToEdit: Goal): void {
    const dialogRef = this.matDialog.open(GoalFormDialogComponent, {
      data: goalToEdit,
    });
    dialogRef.afterClosed().subscribe({
      next: (goalUpdated) => {
        if (goalUpdated) {
          this.goalsService.editGoal(goalToEdit.id, goalUpdated);
          this.notifier.showSuccess('Has editado la clase correctamente');
        }
      },
    });
  }
}

