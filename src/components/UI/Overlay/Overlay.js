import React from 'react';
import styles from "./Overlay.module.css";

const overlay = (props) => {
    return (
    <div className={styles.Modal}>
    {props.children}
    </div>
    )

}
export default overlay;