export {};

declare global {
  interface Window {
    Pusher: any;
    Echo: any;
  }
}
