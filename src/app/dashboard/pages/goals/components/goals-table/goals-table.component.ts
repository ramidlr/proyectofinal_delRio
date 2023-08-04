import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Goal } from '../../models/model';

export interface GoalElement {
  id: number;
  name: string;
  description: string;
}
@Component({
  selector: 'app-goals-table',
  templateUrl: './goals-table.component.html',
  styleUrls: ['./goals-table.component.scss']
})
export class GoalsTableComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'actions'
  ];

  @Input()
  dataSource: Goal[] = [];

  @Output()
  deleteGoal = new EventEmitter<Goal>();

  @Output()
  editGoal = new EventEmitter<Goal>();
}
