import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  BaseEventFormComponent,
  BaseEventModalData,
  sharedBaseEventFormImports,
} from '../base-event-form/base-event-form.component';
import { EventType, MusicEvent } from '../../../model/event.model';
import { MUSIC_EVENT_FORM_FIELDS } from '../event-form-fields';
import { FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EventFormService } from '../../../model/event-form.service';

type MusicFormFields = typeof MUSIC_EVENT_FORM_FIELDS;

@Component({
  selector: 'app-music-event-form',
  standalone: true,
  imports: [...sharedBaseEventFormImports, BaseEventFormComponent],
  templateUrl: './music-event-form.component.html',
  styleUrls: ['./music-event-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicEventFormComponent {
  private ref = inject(DynamicDialogRef);
  private config = inject(
    DynamicDialogConfig<MusicEventModalData>,
  ) as DynamicDialogConfig<MusicEventModalData>;
  private eventFormService = inject(EventFormService);
  private eventType: EventType = 'music';

  protected readonly FIELDS = MUSIC_EVENT_FORM_FIELDS;

  form: FormGroup = this.eventFormService.createForm<MusicFormFields>(
    this.config.data?.event,
    {
      [this.FIELDS.MUSIC_GENRE]: [
        this.config.data?.event?.musicGenre || '',
        Validators.required,
      ],
    },
  );

  handleSave() {
    const event = this.eventFormService.submitForm(this.form, this.eventType);

    if (event) {
      this.config.data?.saveHandler(event).subscribe(() => {
        this.ref.close();
      });
    }
  }

  onCancel() {
    this.ref.close();
  }
}

interface MusicEventModalData extends BaseEventModalData {
  event?: MusicEvent;
}
