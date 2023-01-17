export default function (leave: string, come: string) {
  if (typeof document.hidden !== "undefined") {
    document.addEventListener(
      "visibilitychange",
      () => {
        document.title = document.visibilityState === "hidden" ? leave : come;
      },
      false
    );
  }
}
