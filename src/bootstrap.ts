import pusher from "pusher-js";

import consoleInfo from "./components/ConsoleInfo";
import changeTitle from "./components/site/ChangeTitle";

/**
 * Sentry、增加 JavaScript 没有的函数（PHP 上的函数）、Chrome 控制台信息，LocalStorage 数据过期时的处理等
 */
export default function bootstrap() {
  if (import.meta.env.PROD) {
    import("@sentry/react").then((Sentry) => {
      Sentry.init({ dsn: import.meta.env.VITE_SENTRY_DSN });
    });
  }

  // Chrome 控制台信息
  consoleInfo();

  changeTitle(`记得回来！- ${import.meta.env.VITE_NAME}`, `欢迎回来！- ${import.meta.env.VITE_NAME}`);

  /**
   * Echo exposes an expressive API for subscribing to channels and listening
   * for events that are broadcast by Laravel. Echo and event broadcasting
   * allows your team to easily build robust real-time web applications.
   */
  window.Pusher = pusher;
}
