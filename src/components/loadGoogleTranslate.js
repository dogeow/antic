export default function loadGoogleMaps(callback) {
  const existingScript = document.getElementById("googleMaps");

  if (!existingScript) {
    const script = document.createElement("script");
    script.src = "/googleTranslate.js";
    script.id = "googleTranslate";
    document.body.appendChild(script);

    script.onload = () => {
      if (callback) {
        callback();
      }
    };
  }

  if (existingScript && callback) {
    callback();
  }
}
