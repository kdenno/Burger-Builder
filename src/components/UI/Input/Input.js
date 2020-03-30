import React from "react";
import styles from "./Input.module.css";

const input = props => {
  let inputElement = null;
  switch (props.elementtype) {
    case ("input"):
      inputElement = (
        <input
          className={styles.InputElement}
          {...props.elementconfig}
          value={props.value} onChange={props.changed}
        />
      );
      break;
    case ("textarea"):
      inputElement = (
        <textarea
          className={styles.InputElement}
          {...props.elementconfig}
          value={props.value} onChange={props.changed}
        />
      );
      break;
    case ("select"):
      inputElement = (
        <select className={styles.InputElement} value={props.value} onChange={props.changed}>
          {props.elementconfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={styles.InputElement}
          {...props.elementconfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};
export default input;
