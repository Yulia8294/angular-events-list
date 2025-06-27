import { Event } from '../../model/event.model';

export type EventTableColumn = {
  field: keyof Event;
  header: string;
  style?: string;
  type?: 'text' | 'date' | 'tag' | 'action';
};

export const EVENT_TABLE_COLUMNS: EventTableColumn[] = [
  { field: 'title', header: 'Title', style: 'min-width: 200px' },
  { field: 'description', header: 'Description', style: 'min-width: 250px' },
  { field: 'location', header: 'Location' },
  { field: 'type', header: 'Type', type: 'tag' },
  {
    field: 'id',
    header: 'Actions',
    type: 'action',
    style: 'width: 120px',
  },
] as const;
