import { IUser } from './user.interface';
import { ISupport } from './support.interface';

export interface IPayLoad {
  data: IUser;
  support: ISupport;
}
