import React, { useCallback } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";

export default (props) => {
  const handleReCaptchaVerify = useCallback(
    (token) => {
      props.onSaveToken(token);
    },
    [props.onSaveToken]
  );

  return (
    <div>
      <GoogleReCaptcha action="register" onVerify={handleReCaptchaVerify} />
    </div>
  );
};
