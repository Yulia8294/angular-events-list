import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Type,
} from '@angular/core';
import { EventsService } from '../../services/events.service';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { DialogService } from 'primeng/dynamicdialog';
import { Event, EventType } from '../../model/event.model';
import { MenuItem } from 'primeng/api';
import {
  EVENT_FORM_COMPONENTS,
  EventFormComponent,
} from '../forms/event-form-component.map';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { EVENT_TABLE_COLUMNS } from './event-table.model';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [
    ButtonModule,
    RouterModule,
    CommonModule,
    MenuModule,
    TableModule,
    TagModule,
  ],
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class EventsListComponent {
  private eventService = inject(EventsService);
  private dialogService = inject(DialogService);

  columns = EVENT_TABLE_COLUMNS;

  events = this.eventService.getEvents();

  createEventOptions: MenuItem[] = [
    {
      label: 'Sport Event',
      icon: 'pi pi-futbol',
      command: () => this.openEditEventDialog(false, undefined, 'sport'),
    },
    {
      label: 'Music Event',
      icon: 'pi pi-music',
      command: () => this.openEditEventDialog(false, undefined, 'music'),
    },
  ];

  protected deleteEvent(id: string) {
    this.eventService.deleteEvent(id);
  }

  getSeverity(eventType: EventType): string {
    switch (eventType) {
      case 'music':
        return 'success';
      case 'sport':
        return 'info';
    }
  }

  openEditEventDialog(
    isEditing: boolean,
    event?: Event,
    type: EventType = 'music',
  ) {
    const component = EVENT_FORM_COMPONENTS[type];

    this.dialogService.open(component as Type<EventFormComponent>, {
      dismissableMask: true,
      modal: true,
      width: '400px',
      header: isEditing ? 'Edit event' : 'Create event',
      data: {
        event,
        isEditing,
        type,
        saveHandler: (event: Event) =>
          isEditing
            ? this.eventService.updateEvent(event)
            : this.eventService.addEvent(event),
      },
    });
  }

  onDeleteClicked(event: Event) {
    this.eventService.deleteEvent(event.id);
  }
}
