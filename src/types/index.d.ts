export {};

declare global {
  interface Window {
    Pusher: any;
    Echo: any;
  }
}

interface Quote {
  id: number;
  content: string;
}

interface Pic {
  id: number;
  name: string;
  folder: string;
}
