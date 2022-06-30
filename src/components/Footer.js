import React from "react";
import ReactDOM from "react-dom";
import "./Footer.css";

export default function Footer(props) {
  return ReactDOM.createPortal(
    <footer className="attribution">{props.children}</footer>,
    document.body
  );
}
