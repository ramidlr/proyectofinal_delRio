export interface User {
  id: number;
  dni: string;
  name: string;
  surname: string;
  email: string;
  course: any;
  password: string;
  token: string;
  role: 'admin' | 'user' 
}

export interface CreateUserData {
  dni: string;
  name: string;
  surname: string;
  email: string;
  course: any;
  password: string;
  role: string,
}


export interface UpdateUserData {
  dni?: string;
  name?: string;
  surname?: string;
  email?: string;
  course?: any;
  password?: string;
  role?: string;
  token?: string
}


