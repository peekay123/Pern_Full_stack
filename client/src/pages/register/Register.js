import React, {useState} from 'react';
// import {toast} from 'react-toastify';


const Register = ({setAuth}) => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: ''
  })

  const {name, email, password, confirmpassword} = inputs;

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try{
      const body = {name, email, password, confirmpassword}
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
       'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.token);
      setAuth(true)

    }catch(error) {
      console.log(error)
    }
  }
  return (
    <>
    <form onSubmit={onSubmitForm}>
      <h1>Register</h1>
      <input 
      type='text' 
      name='name' 
      placeholder='Enter Username'
      value={name}
      onChange={e => onChange(e)}
      /><br/><br/>
      <input 
      type='email' 
      name='email' 
      placeholder='Enter Email'
      value={email}
      onChange={e => onChange(e)}
      /><br/><br/>
      <input 
      type='password' 
      name='password' 
      placeholder='Enter Password'
      value={password}
      onChange={e => onChange(e)}
      /><br/><br/>
      <input 
      type='password' 
      name='confirmpassword' 
      placeholder='Confirm Password'
      value={confirmpassword}
      onChange={e => onChange(e)}
      /><br/><br/>
      <button>Submit</button>
    </form>
    </>
  )
}

export default Register;
