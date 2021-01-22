const loadGMaps = (callback) => {
  const existingScript = document.getElementById("three");
  if (!existingScript) {
    const script1 = document.createElement("script");
    script1.src = "/demos/canvas/js/three.min.js";
    script1.id = "three";
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "/demos/canvas/js/tweenjs.min.js";
    script2.id = "three";
    document.body.appendChild(script2);

    const script3 = document.createElement("script");
    script3.src = "/demos/canvas/js/TrackballControls.js";
    script3.id = "three";
    document.body.appendChild(script3);

    const script4 = document.createElement("script");
    script4.src = "/demos/canvas/js/CSS3DRenderer.js";
    script4.id = "three";
    document.body.appendChild(script4);

    script4.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};

export default loadGMaps;
