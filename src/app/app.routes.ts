import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'calculs',
    loadComponent: () => import('./calculs/calculs.page').then( m => m.CalculsPage)
  },
  {
    path: 'jeux',
    loadComponent: () => import('./jeux/jeux.page').then( m => m.JeuxPage)
  },
];
