import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BASE_EVENT_FORM_FIELDS } from '../components/forms/event-form-fields';
import { Event, EventType } from '../model/event.model';

const fields = BASE_EVENT_FORM_FIELDS;

type BaseFormFields = typeof BASE_EVENT_FORM_FIELDS;

type FormControlsRecord<T extends Record<string, string>> = {
  [K in T[keyof T]]: any[];
};

@Injectable({
  providedIn: 'root',
})
export class EventFormService {
  private fb = inject(FormBuilder);

  private createBaseFormControls<T extends BaseFormFields>(
    event?: Event,
  ): FormControlsRecord<T> {
    return {
      [fields.ID]: [event?.id || ''],
      [fields.TITLE]: [event?.title || '', Validators.required],
      [fields.DESCRIPTION]: [event?.description || '', Validators.required],
      [fields.LOCATION]: [event?.location || '', Validators.required],
    } as FormControlsRecord<T>;
  }

  createForm<T extends BaseFormFields>(
    event?: Event,
    additionalControls?: Partial<FormControlsRecord<T>>,
  ): FormGroup {
    const baseControls = this.createBaseFormControls(event);
    const allControls = { ...baseControls, ...additionalControls };
    return this.fb.group(allControls);
  }

  submitForm(form: FormGroup, eventType: EventType): Event | null {
    if (form.invalid) {
      return null;
    }

    const event: Event = {
      ...form.value,
      type: eventType,
    } as Event;

    return event;
  }
}
