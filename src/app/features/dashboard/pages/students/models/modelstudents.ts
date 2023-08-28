export interface Student {
  id: number;
  dni: string;
  name: string;
  surname: string;
  email: string;
  course: any;
  password: string;
  token: string;
  categoryId: number;
}

export interface CreateStudentData {
  dni: string;
  name: string;
  surname: string;
  email: string;
  course: any;
  password: string;
}
export interface UpdateStudentData {
  dni?: string;
  name?: string;
  surname?: string;
  email?: string;
  course?: any;
  password?: string;
}


