import React from "react";

export default function HideButton({ onClick }) {
  return (
    <button type="button" className="hide-button" onClick={onClick}>
      Hide Backdrop
    </button>
  );
}
