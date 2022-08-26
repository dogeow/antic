import { Theme } from "@mui/material";

export {};

declare global {
  interface Window {
    Pusher: any;
    Echo: any;
  }
}
