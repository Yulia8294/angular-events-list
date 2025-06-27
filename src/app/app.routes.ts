import { Routes } from '@angular/router';
import { EventsListComponent } from './components/events-list/events-list.component';

export enum AppRoutes {
  Events = 'events',
}

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.Events,
  },
  {
    path: AppRoutes.Events,
    component: EventsListComponent,
  },
];
