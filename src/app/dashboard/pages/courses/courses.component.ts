import { Component, OnInit } from '@angular/core';
import { Course } from './models/index';
import { CourseService } from './course.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public dataSource: Course[] = [];
  public displayedColumns = ['id', 'name', 'description', 'credits', 'price']

  constructor(private courseService: CourseService) { }


  ngOnInit(): void {
    this.courseService.loadCourses();
    this.courseService.getCourses().pipe(take(1)).subscribe({
      next: (data) => console.log('data: ', data),
    })
  }



}
