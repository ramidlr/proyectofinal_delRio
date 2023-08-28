import { User } from '../models/modelusers';

export class UserMockService {
  private users: User[] = [
    {
      id: 1,
      dni: '90882735',
      name: 'Usuario Falso',
      surname: 'de Testing',
      email: 'admin@dada.com',
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
      email: 'user@sasa.com',
      course: 'UX',
      password: '123456',
      token: '',
      role: 'user'
    }
  ];

  getUsers(): User[] {
    return this.users;
  }
}
