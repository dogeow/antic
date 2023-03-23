import pusher from "pusher-js";

import consoleInfo from "./components/bootstrap/ConsoleInfo";
import changeTitle from "./components/site/ChangeTitle";

/**
 * Sentry、Chrome 控制台信息、更改页面标题
 */
export default function bootstrap() {
  if (import.meta.env.PROD) {
    // Sentry
    import("@sentry/react").then((Sentry) => {
      Sentry.init({ dsn: import.meta.env.VITE_SENTRY_DSN });
    });

    // Chrome 控制台信息
    consoleInfo();
  }

  // 更改页面标题
  changeTitle(`随时欢迎回来！- ${import.meta.env.VITE_NAME}`, `欢迎回来！- ${import.meta.env.VITE_NAME}`);

  /**
   * Echo exposes an expressive API for subscribing to channels and listening
   * for events that are broadcast by Laravel. Echo and event broadcasting
   * allows your team to easily build robust real-time web applications.
   */
  window.Pusher = pusher;
}
