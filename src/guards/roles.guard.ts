import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { includes } from 'lodash';

import { IUser } from '../user/interfaces/user.interface';
import { RolesEnum } from '../user/enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = context.switchToHttp().getRequest();
    return this.validateRequest(user);
  }
  private validateRequest({
    roles,
  }: IUser): boolean | Promise<boolean> | Observable<boolean> {
    const hasValidRoles =
      includes(roles, RolesEnum.user) || includes(roles, RolesEnum.admin);
    if (hasValidRoles) {
      return true;
    }
    return false;
  }
}
