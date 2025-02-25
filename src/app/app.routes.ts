import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { AuthGuard } from './guard/app.guard'; // Import the guard

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Default route should redirect to login
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard], // Protect the entire layout
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes),
      },
      {
        path: 'manage-hub',
        loadChildren: () => import('./views/manage-hub/routes').then((m) => m.routes)
      },
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: { title: 'Page 404' }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: { title: 'Login Page' }
  },
  { path: '**', redirectTo: '404' } // Redirect unknown routes to 404
];
