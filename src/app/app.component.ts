import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { AppRoutes, routes } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TabMenuModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Events',
        icon: 'pi pi-fw pi-book',
        routerLink: [AppRoutes.Events],
      },
    ];
  }
}
