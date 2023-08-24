import { Course } from '../../courses/models/modelcourses';
import { Student } from '../../students/models/modelstudents';


export interface Inscription {
    id: number;
    studentId: number;
    courseId: number;
}

export interface InscriptionWithStudentAndCourse extends Inscription {
    student: Student;
    course: Course;
}

export interface CreateInscriptionPayload {
    studentId: number | null;
    courseId: number | null;
}