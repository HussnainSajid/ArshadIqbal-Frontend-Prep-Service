import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admin Panel'
    },
    children: [
      {
        path: '',
        redirectTo: 'cards',
        pathMatch: 'full'
      },
      {
        path: 'register-user',
        loadComponent: () => import('./register-user/register-user.component').then(m => m.RegisterUserComponent),
        data: {
          title: 'Register User'
        }
      },
      {
        path: 'rates-tariff',
        loadComponent: () => import('./rates-tariff/rates-tariff.component').then(m => m.RatesTariffComponent),
        data: {
          title: 'Rates Tariff'
        }
      },
    ]
  }
];


