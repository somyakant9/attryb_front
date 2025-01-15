import React from "react";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div>
        <Link to="/">
          <button className={styles.button}>Signup</button>
        </Link>
        <Link  to="/login">
          <button className={styles.button}>Login</button>
        </Link>
        <Link to='/addCar'>
          <button className={styles.button}>Car</button>
        </Link>
        <Link to='/showCars'>
          <button className={styles.button}>Inventory</button>
        </Link>
        <Link to='/oem'>
          <button className={styles.button}>OEM</button>
        </Link>
      </div>
    </div>
  );
}
