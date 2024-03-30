import { Routes } from '@angular/router';
import { UsersModule } from './modules/users/users.module';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => UsersModule,
  },
];
