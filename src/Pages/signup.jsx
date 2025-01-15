import React, { useState } from "react";
import styles from "./signup.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role:""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup=async (formData)=>{
      
    try {
      // Send data to backend
      setLoading(true);
      const response = await axios.post('https://attryb-back.onrender.com/api/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role:formData.role
      });

      if (response.status === 201) {
        setLoading(false);
        setError('');
        setFormData({
          name: '',
          email: '',
          password: '',
          role: '',
        });
        navigate('/login');
      }
    } catch (error) {
      setError('Error creating account. Please try again.');
    }
  };


  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("I am from submit")
    console.log(formData);
    
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    
    handleSignup(formData);
    setFormData({ name: "", email: "", password: "" });
  };




  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.head}> SIGN UP</div>
        <form onSubmit={handleOnSubmit}>
          <div className={styles.formG}>
            <label htmlFor="name">Name </label>
            <br />
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div  className={styles.formG}>
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
          <div  className={styles.formG}>
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
          <div  className={styles.formG}>
            <label htmlFor="Role">Role </label>
            <br />
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="buyer">Buyer</option>
              <option value="dealer">Dealer</option>
            </select>
          </div>
          <div className={styles.buttonClick}>
            <input
              className={styles.focusButton}
              type="submit"
              value="Sign up"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
