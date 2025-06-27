export type EventType = 'sport' | 'music';

export interface BaseEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  type: EventType;
}

export interface SportEvent extends BaseEvent {
  type: 'sport';
  participantCount: number;
}

export interface MusicEvent extends BaseEvent {
  type: 'music';
  musicGenre: string;
}

export type Event = SportEvent | MusicEvent;
