import { Course } from "../../courses/models";
import { Student } from "../../students/models/modelstudents";

export interface Inscription {
  id: number;
  courseId: number;
  studentId: number;
}

export interface InscriptionWithCourseAndStudent extends Inscription {
  course: Course;
  student: Student;
}

export interface CreateInscriptionPayload {
  courseId: number | null;
  studentId: number | null;
}