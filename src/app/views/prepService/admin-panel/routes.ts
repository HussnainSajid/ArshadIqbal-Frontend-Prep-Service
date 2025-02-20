import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Prep Service'
    },
    children: [
      {
        path: '',
        redirectTo: 'admin-panel',
        pathMatch: 'full'
      },
      {
        path: 'users',
        loadComponent: () => import('./register-user/register-user.component').then(m => m.RegisterUserComponent),
        data: {
          title: 'Users'
        }
      }
    ]
  }
];