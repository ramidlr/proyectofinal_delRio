import { User } from '../models/modelusers';

export class UserMockService {
  private users: User[] = [
    {
      id: 1,
      dni: '90882735',
      name: 'Usuario Falso',
      surname: 'de Testing',
      email: 'mail@mail.com',
      course: 'Angular',
      password: '123456',
      token: '',
      role: 'admin'
    },
    {
      id: 2,
      dni: '38992781',
      name: 'testing',
      surname: 'Zjskkjajs',
      email: 'zabaleta@gmail.com',
      course: 'UX',
      password: '123456',
      token: '',
      role: 'normaluser'
    }
  ];

  getUsers(): User[] {
    return this.users;
  }
}
