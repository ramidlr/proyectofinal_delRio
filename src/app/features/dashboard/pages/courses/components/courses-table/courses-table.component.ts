import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';

export interface CourseElement {
  id: number;
  name: string;
  description: string;
  credits: number;
  price: number;
}


@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'credits',
    'price',
    'actions'
  ];

  @Input()
  dataSource: Course[] = [];

  @Output()
  deleteCourse = new EventEmitter<Course>();

  @Output()
  editCourse = new EventEmitter<Course>();
}
