import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'libraries',
    pathMatch: 'full',
  },
  {
    path: 'libraries',
    loadComponent: () => import('./pages/libraries/libraries.component').then(c => c.LibrariesComponent),
    pathMatch: 'full',
  },
  {
    path: 'libraries/:id',
    loadComponent: () => import('./pages/library-view/library-view.component').then(c => c.LibraryViewComponent),
  },
];
