import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/features/dashboard/pages/users/models/modelusers';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(user: User, ...args: unknown[]): unknown {
    return `${user.name} ${user.surname} `;
  }

}
