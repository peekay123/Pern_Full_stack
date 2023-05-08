import React, {useState} from "react";
import {toast} from 'react-toastify';
import "./Login.css";

export default function Login({setAuth}) {
  const[inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const {email, password} = inputs;

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {email, password}
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();
      // console.log(pasrseRes.token)
      if(parseRes){
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success('Login Successfully')
      } else {
        setAuth(false)
        toast.error('Login Failed')
      }
    }catch(error){
      console.log(error);
    }
  }
    return (
        <div>
    <section className="login_sec">
    <div className="center">
      <h1>Sign-in</h1>
      <form onSubmit={onSubmitForm}>
        <div className="txt_field">
          <input 
          type='email' 
          name='email'
          value={email}
          onChange={e => onChange(e)} 
          required/>
          <span></span>
          <label>Email</label>
        </div>
        <div className="txt_field">
          <input 
          type='password' 
          name='password' 
          value={password}
          onChange={e => onChange(e)}
          required/>
          <span></span>
          <label>Password</label>
        </div>
        <button type="submit" className="login_btn">signin</button>
      </form>
    </div>
  </section>
  </div>
    )
}