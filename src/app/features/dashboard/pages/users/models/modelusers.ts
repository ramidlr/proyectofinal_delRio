export interface User {
  id: number;
  dni: string;
  name: string;
  surname: string;
  email: string;
  course: any;
  password: string;
  token: string;
  role: "admin" | 'normaluser';
}

export interface CreateUserData {
  dni: string;
  name: string;
  surname: string;
  email: string;
  course: any;
  password: string;
}
export interface UpdateUserData {
  dni?: string;
  name?: string;
  surname?: string;
  email?: string;
  course?: any;
  password?: string;
  token?: string;
}


