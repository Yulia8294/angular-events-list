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
import { FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EventType, SportEvent } from '../../../model/event.model';
import { EventFormService } from '../../../services/event-form.service';

type SportFormFields = typeof SPORT_EVENT_FORM_FIELDS;

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
  private ref = inject(DynamicDialogRef);
  private config = inject(
    DynamicDialogConfig<SportEventModalData>,
  ) as DynamicDialogConfig<SportEventModalData>;
  private eventFormService = inject(EventFormService);
  private eventType: EventType = 'sport';

  protected readonly FIELDS = SPORT_EVENT_FORM_FIELDS;

  form: FormGroup = this.eventFormService.createForm<SportFormFields>(
    this.config.data?.event,
    {
      [this.FIELDS.PARTICIPANT_COUNT]: [
        this.config.data?.event?.participantCount || 1,
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

interface SportEventModalData extends BaseEventModalData {
  event?: SportEvent;
}
