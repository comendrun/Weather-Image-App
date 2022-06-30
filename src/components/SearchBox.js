import React from "react";
import "./SearchBox.css";

export default function SearchBox(props) {
  return (
    <div className="search-box">
      <input
        placeholder="Enter City Name ..."
        className="input"
        id="search"
        value={props.value}
        onChange={(e) => props.onChange(e)}
        name={props.query}
        onKeyPress={props.search}
        // value={query}
      />
      <button onClick={(e) => props.searchButtonClick(e)}>
        <i className="fa-solid fa-magnifying-glass-location fa-2xl"></i>
      </button>
    </div>
  );
}
