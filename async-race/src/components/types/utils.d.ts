export type EventCallback = (event: Event) => void;

export interface EventHandler {
  handleEvent: EventCallback;
}
