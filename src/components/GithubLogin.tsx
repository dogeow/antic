import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import React, { Component } from "react";

import { toQuery } from "../helpers";
import PopupWindow from "./PopupWindow";

class GitHubLogin extends Component {
  static propTypes = {
    buttonText: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    clientId: PropTypes.string.isRequired,
    onRequest: PropTypes.func,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
    redirectUri: PropTypes.string,
    scope: PropTypes.string,
  };

  static defaultProps = {
    buttonText: "Sign in with GitHub",
    redirectUri: "",
    scope: "user:email",
    onRequest: () => {},
    onSuccess: () => {},
    onFailure: () => {},
  };

  onBtnClick = () => {
    const { clientId, scope, redirectUri } = this.props;
    const search = toQuery({
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
    });
    const popup = (this.popup = PopupWindow.open(
      "github-oauth-authorize",
      `https://github.com/login/oauth/authorize?${search}`,
      { height: 600, width: 600 }
    ));

    this.onRequest();
    popup.then(
      (data) => {
        popup.close();
        this.onSuccess(data);
      },
      (error) => this.onFailure(error)
    );
  };

  onRequest = () => {
    this.props.onRequest();
  };

  onSuccess = (data) => {
    if (!data.code) {
      return this.onFailure(new Error("'code' not found"));
    }

    this.props.onSuccess(data);
  };

  onFailure = (error) => {
    this.props.onFailure(error);
  };

  render() {
    const { className, buttonText, children } = this.props;
    const attrs = { onClick: this.onBtnClick };

    if (className) {
      attrs.className = className;
    }

    return (
      <Button variant="contained" {...attrs}>
        {children || buttonText}
      </Button>
    );
  }
}

export default GitHubLogin;
