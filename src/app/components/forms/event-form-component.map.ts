import { Type } from '@angular/core';
import { EventType } from '../../model/event.model';
import { MusicEventFormComponent } from './music-event-form/music-event-form.component';
import { SportEventFormComponent } from './sport-event-form/sport-event-form.component';
import { FormGroup } from '@angular/forms';

interface IEventForm {
  form: FormGroup;
}

export const EVENT_FORM_COMPONENTS = {
  sport: SportEventFormComponent,
  music: MusicEventFormComponent,
} as const satisfies Record<EventType, Type<IEventForm>>;

export type EventFormComponent =
  | SportEventFormComponent
  | MusicEventFormComponent;
