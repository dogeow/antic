import { Icon, InlineIcon } from "@iconify/react";
import reactRouter from "@iconify-icons/logos/react-router";
import reduxIcon from "@iconify-icons/logos/redux";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const width = 30;

const useStyles = makeStyles({
  "@global": {
    "#roads": {
      "& ul li": {
        display: "inline-block",
        marginRight: 10,
      },
      "& ul ul li": {
        textAlign: "center",
      },
    },
  },
});

function Logo(props) {
  useStyles();

  return (
    <img
      width={width}
      src={`${process.env.REACT_APP_CDN_URL}/logo/${props.name}.svg`}
    />
  );
}

export default function () {
  return (
    <div id="roads">
      <h2>个人笔记</h2>
      <h3>前端</h3>
      <ul>
        <li>
          <Logo name="React" />
          <p>React</p>
          <ul>
            <li>
              <Logo name="Material-UI" />
              <p>Material-UI</p>
            </li>
            <li>
              <Icon icon={reactRouter} width={width} />
              <p>React Router</p>
            </li>
            <li>
              <Icon icon={reduxIcon} width={width} />
              <p>React Redux</p>
            </li>
          </ul>
        </li>
      </ul>
      <h3>后端</h3>
      <ul>
        <li>
          <Logo name="Laravel" />
          <p>Laravel</p>
        </li>
      </ul>
    </div>
  );
}
