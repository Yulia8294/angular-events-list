import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  BaseEventFormComponent,
  BaseEventModalData,
  sharedBaseEventFormImports,
} from '../base-event-form/base-event-form.component';
import { SPORT_EVENT_FORM_FIELDS } from '../event-form-fields';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-sport-event-form',
  standalone: true,
  imports: [
    ...sharedBaseEventFormImports,
    BaseEventFormComponent,
    InputNumberModule,
  ],
  templateUrl: './sport-event-form.component.html',
  styleUrls: ['./sport-event-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SportEventFormComponent {
  private fb = inject(FormBuilder);
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig<SportEventModalData>);

  protected readonly FIELDS = SPORT_EVENT_FORM_FIELDS;

  form = this.fb.group({
    [this.FIELDS.ID]: [this.config.data?.event?.id || ''],
    [this.FIELDS.TITLE]: [
      this.config.data?.event?.title || '',
      Validators.required,
    ],
    [this.FIELDS.DESCRIPTION]: [
      this.config.data?.event?.description || '',
      Validators.required,
    ],
    [this.FIELDS.LOCATION]: [
      this.config.data?.event?.location || '',
      Validators.required,
    ],
    [this.FIELDS.PARTICIPANT_COUNT]: [
      this.config.data?.event?.participantCount || 1,
      Validators.required,
    ],
  });

  handleSave() {
    if (this.form.invalid) return;

    const event: Event = {
      ...this.form.value,
      type: 'sport',
    } as Event;

    this.config.data?.saveHandler(event).subscribe(() => {
      this.ref.close();
    });
  }

  onCancel() {
    this.ref.close();
  }
}

interface SportEventModalData extends BaseEventModalData {}
