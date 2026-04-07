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
  {
    path: 'transfert-data',
    loadComponent: () => import('./transfert-data/transfert-data.page').then( m => m.TransfertDataPage)
  },
  {
    path: 'ui-page',
    loadComponent: () => import('./ui-page/ui-page.page').then( m => m.UIPage)
  },  {
    path: 'ui-components',
    loadComponent: () => import('./ui-components/ui-components.page').then( m => m.UiComponentsPage)
  },
  {
    path: 'weather',
    loadComponent: () => import('./weather/weather.page').then( m => m.WeatherPage)
  },
  {
    path: 'maps',
    loadComponent: () => import('./maps/maps.page').then( m => m.MapsPage)
  },
  {
    path: 'clipboard',
    loadComponent: () => import('./clipboard/clipboard.page').then( m => m.ClipboardPage)
  },
  {
    path: 'sms-phone',
    loadComponent: () => import('./sms-phone/sms-phone.page').then( m => m.SmsPhonePage)
  }
];
