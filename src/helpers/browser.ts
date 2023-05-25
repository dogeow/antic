type EnhancedElement = HTMLElement & {
  requestFullscreen?: () => Promise<void>;
  mozRequestFullScreen?: () => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void>;
  msRequestFullscreen?: () => Promise<void>;
};

type EnhancedDocument = Document & {
  exitFullscreen?: () => Promise<void>;
  mozCancelFullScreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void>;
  msExitFullscreen?: () => Promise<void>;
};

// 全屏
export function fullscreen() {
  try {
    const docElm: EnhancedElement = document.documentElement;
    const requestFullscreen =
      docElm.requestFullscreen ??
      docElm.webkitRequestFullscreen ??
      docElm.mozRequestFullScreen ??
      docElm.msRequestFullscreen;

    if (requestFullscreen) {
      requestFullscreen.call(docElm);
    } else {
      throw new Error();
    }
  } catch {
    alert("您所使用的浏览器不支持全屏");
  }
}

// 退出全屏
export function exitFullscreen() {
  try {
    const doc: EnhancedDocument = document;
    const exitFullscreen =
      doc.exitFullscreen ?? doc.mozCancelFullScreen ?? doc.webkitExitFullscreen ?? doc.msExitFullscreen;

    if (exitFullscreen) {
      exitFullscreen.call(doc);
    } else {
      throw new Error();
    }
  } catch {
    alert("您所使用的浏览器不支持退出全屏, 请按 ESC");
  }
}
