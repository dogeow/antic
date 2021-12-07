export default function (leave, come) {
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

  // 添加监听器，在 title 里显示状态变化
  document.addEventListener(
    visibilityChange,
    () => {
      document.title = document[state] === "hidden" ? leave : come;
    },
    false
  );
}
