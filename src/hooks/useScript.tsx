import { useEffect } from "react";

const useScript = (url: string) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      const loadedScript = document.querySelector(`script[src="${url}"]`);
      if (loadedScript) {
        document.body.removeChild(loadedScript);
      }
    };
  }, [url]);
};

export default useScript;
