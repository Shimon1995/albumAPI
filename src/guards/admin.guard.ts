import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { Request } from 'express';
import { IUser } from '../user/interfaces/user.interface';
import { RolesEnum } from '../user/enums/roles.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user: Partial<IUser> = request.user;
    return _.includes(user.roles, RolesEnum.admin);
  }
}
