export const BASE_EVENT_FORM_FIELDS = {
  ID: 'id',
  TITLE: 'title',
  DESCRIPTION: 'description',
  LOCATION: 'location',
} as const;

export const MUSIC_EVENT_FORM_FIELDS = {
  ...BASE_EVENT_FORM_FIELDS,
  MUSIC_GENRE: 'musicGenre',
} as const;

export const SPORT_EVENT_FORM_FIELDS = {
  ...BASE_EVENT_FORM_FIELDS,
  PARTICIPANT_COUNT: 'participantCount',
} as const;

export type BaseEventFormField =
  (typeof BASE_EVENT_FORM_FIELDS)[keyof typeof BASE_EVENT_FORM_FIELDS];
export type MusicEventFormField =
  (typeof MUSIC_EVENT_FORM_FIELDS)[keyof typeof MUSIC_EVENT_FORM_FIELDS];
export type SportEventFormField =
  (typeof SPORT_EVENT_FORM_FIELDS)[keyof typeof SPORT_EVENT_FORM_FIELDS];
