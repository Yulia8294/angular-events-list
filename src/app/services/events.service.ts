import { Injectable, Signal, signal } from '@angular/core';
import { Event } from '../model/event.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor() {}

  private events = signal<Event[]>([
    {
      id: 'sport1',
      title: 'Annual City Marathon',
      description:
        'Join thousands of runners in our annual 42km race through the city',
      location: 'Main Street Downtown',
      type: 'sport',
      participantCount: 2500,
    },
    {
      id: 'sport2',
      title: 'International Tennis Open',
      description:
        'Watch top-ranked players compete in this prestigious tournament',
      location: 'National Tennis Center',
      type: 'sport',
      participantCount: 32,
    },
    {
      id: 'music1',
      title: 'Jazz in the Park',
      description:
        'Outdoor jazz festival featuring local and international artists',
      location: 'Central Park Amphitheater',
      type: 'music',
      musicGenre: 'Jazz',
    },
    {
      id: 'music2',
      title: 'Rock Symphony',
      description: 'Classic rock hits performed with full symphony orchestra',
      location: 'City Concert Hall',
      type: 'music',
      musicGenre: 'Rock',
    },
  ]);

  getEvents(): Signal<Event[]> {
    return this.events.asReadonly();
  }

  addEvent(event: Event): Observable<Event> {
    const newEvent: Event = {
      ...event,
      id: this.generateId(),
    };
    this.events.update((events) => [...events, newEvent]);
    // simulate returning server response
    return of(newEvent);
  }

  updateEvent(updatedEvent: Event): Observable<Event> {
    this.events.update((events) =>
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );
    // simulate returning server response
    return of(updatedEvent);
  }

  deleteEvent(id: string): Observable<void> {
    this.events.update((events) => events.filter((event) => event.id !== id));
    return of();
  }

  generateId(): string {
    return Math.random().toString(36).substring(2, 10);
  }
}
