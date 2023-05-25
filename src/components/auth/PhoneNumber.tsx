import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import withStyles from "@mui/styles/withStyles";
import * as React from "react";

import CustomTextField from "../CustomTextField";

const ValidationTextField = withStyles({
  root: {
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
    "& p": {
      color: "green",
    },
  },
})(CustomTextField);

export default (props) =>
  props.phoneNumber.length === 11 && props.sentPhoneSuccess ? (
    <ValidationTextField
      id={"phone_number"}
      label={"手机号码"}
      value={props.phone_number}
      placeholder={""}
      onChange={props.setPhoneNumber}
      error={props.inputErrors?.phone_number || "已发送验证码，五分钟内有效"}
      icon={<PhoneIphoneIcon />}
    />
  ) : (
    <ValidationTextField
      id={"phone_number"}
      label={"手机号码"}
      value={props.phone_number}
      placeholder={""}
      onChange={props.setPhoneNumber}
      error={props.inputErrors?.phone_number}
      icon={<PhoneIphoneIcon />}
    />
  );
