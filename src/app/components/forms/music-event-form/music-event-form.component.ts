import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  BaseEventFormComponent,
  BaseEventModalData,
  sharedBaseEventFormImports,
} from '../base-event-form/base-event-form.component';
import { Event } from '../../../model/event.model';
import { MUSIC_EVENT_FORM_FIELDS } from '../event-form-fields';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-music-event-form',
  standalone: true,
  imports: [...sharedBaseEventFormImports, BaseEventFormComponent],
  templateUrl: './music-event-form.component.html',
  styleUrls: ['./music-event-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicEventFormComponent {
  private fb = inject(FormBuilder);
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig<MusicEventModalData>);

  protected readonly FIELDS = MUSIC_EVENT_FORM_FIELDS;

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
    [this.FIELDS.MUSIC_GENRE]: [
      this.config.data?.event?.musicGenre || '',
      Validators.required,
    ],
  });

  handleSave() {
    if (this.form.invalid) return;

    const event: Event = {
      ...this.form.value,
      type: 'music',
    } as Event;

    this.config.data?.saveHandler(event).subscribe(() => {
      this.ref.close();
    });
  }

  onCancel() {
    this.ref.close();
  }
}

interface MusicEventModalData extends BaseEventModalData {}
