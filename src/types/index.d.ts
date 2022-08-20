import Pusher from "pusher-js/src/core/pusher";

export {};

declare global {
  interface Window {
    Pusher: any;
  }
}
