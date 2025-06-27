import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { BASE_EVENT_FORM_FIELDS } from '../event-form-fields';
import { Observable } from 'rxjs';
import { TextareaModule } from 'primeng/textarea';
import { Event } from '../../../model/event.model';

export const sharedBaseEventFormImports = [
  InputTextModule,
  ButtonModule,
  ReactiveFormsModule,
  TextareaModule,
];

@Component({
  selector: 'app-base-event-form',
  standalone: true,
  imports: [...sharedBaseEventFormImports],
  templateUrl: './base-event-form.component.html',
  styleUrls: ['./base-event-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseEventFormComponent {
  @Output() onSave = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  @Input() form!: UntypedFormGroup;

  protected readonly FIELDS = BASE_EVENT_FORM_FIELDS;
}

export interface BaseEventModalData {
  event?: Event;
  saveHandler: (event: Event) => Observable<Event>;
}
