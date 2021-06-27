export default function () {
  // 网页当前状态判断
  let state;
  let visibilityChange;
  if (typeof document.hidden !== "undefined") {
    visibilityChange = "visibilitychange";
    state = "visibilityState";
  } else if (typeof document.mozHidden !== "undefined") {
    visibilityChange = "mozvisibilitychange";
    state = "mozVisibilityState";
  } else if (typeof document.msHidden !== "undefined") {
    visibilityChange = "msvisibilitychange";
    state = "msVisibilityState";
  } else if (typeof document.webkitHidden !== "undefined") {
    visibilityChange = "webkitvisibilitychange";
    state = "webkitVisibilityState";
  }

  // 添加监听器，在title里显示状态变化
  document.addEventListener(
    visibilityChange,
    () => {
      document.title =
        document[state] === "hidden"
          ? `记得回来！- ${process.env.REACT_APP_NAME}`
          : `欢迎回来！- ${process.env.REACT_APP_NAME}`;
    },
    false
  );
}
