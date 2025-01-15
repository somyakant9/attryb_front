import React, { useState } from "react";
import styles from "./signup.module.css";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin =async (formData)=>{
     
    try {
      const response = await axios.post('https://attryb-back.onrender.com/api/auth/login', formData); 
      const { token } = response.data;

      // Store the token in localStorage (or cookies)
      sessionStorage.setItem('authToken', token);
      setTimeout(() => {
        // Redirect to add car page
        window.location.href = '/addCar';
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  }
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("I am from submit")
    console.log(formData);
    handleLogin(formData);
  };
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.head}> Login</div>
        <form onSubmit={handleOnSubmit}>
          <div className={styles.formG}>
            <label htmlFor="email">Email </label>
            <br />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formG}>
            <label htmlFor="password">Password </label>
            <br />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.buttonClick}>
            <input
              className={styles.focusButton}
              type="submit"
              value="Log in"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
