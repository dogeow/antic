/**
 * 控制台信息
 */
export default function consoleInfo() {
  if (process.env.NODE_ENV === "production") {
    window.console.log(
      `%c ${process.env.REACT_APP_NAME}`,
      "font-size:50px; text-shadow: 10px 10px 10px black"
    );
  }
}
