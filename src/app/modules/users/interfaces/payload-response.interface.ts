import { ISupport } from './support.interface';
import { IUser } from './user.interface';

export interface IPayLoadResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: IUser[];
  support: ISupport;
}
