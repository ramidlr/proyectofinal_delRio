import { User } from '../models/model';

export class UserMockService {
  private users: User[] = [
    {
      id: 1,
      dni: '90882735',
      name: 'Usuario Falso',
      surname: 'de Testing',
      email: 'jc8989scila@hotmail.com',
      course: 'Angular',
      password: '123456',
      token: ''
    },
    {
      id: 2,
      dni: '38992781',
      name: 'testing',
      surname: 'Zjskkjajs',
      email: 'zabaleta@gmail.com',
      course: 'UX',
      password: '123456',
      token: ''

    },
    {
      id: 3,
      dni: '40009087',
      name: 'Jonathan',
      surname: 'Gonzalez',
      email: 'j_gonzalez90@hotmail.com',
      course: 'React',
      password: '123456',
      token: ''

    },
  ];

  getUsers(): User[] {
    return this.users;
  }
}
