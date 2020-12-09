/**
 * 控制台信息
 */
export default function consoleInfo() {
  if (process.env.NODE_ENV === "development") {
    return;
  }
  window.console.log(
    `%c ${process.env.REACT_APP_NAME}`,
    "font-size:50px; text-shadow: 10px 10px 10px black"
  );
  if (1) {
    window.console.group("用户列表");
    window.console.log("昵称: 小李世界");
    window.console.log("职业: 程序🐶");
    window.console.log("语言: PHP");
    if (1) {
      window.console.group("兴趣");
      window.console.log("音乐");
      window.console.log("守望先锋");
      window.console.groupEnd();
    }
    window.console.groupEnd();
  }
}
