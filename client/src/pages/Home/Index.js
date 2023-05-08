import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faBars } from '@fortawesome/fontawesome-free-solid';
import FormData from "../Form/Form";
import {toast} from 'react-toastify';
import "./Index.css";
import img from "../../Assets/images/bottom_wave.png";
import ViewData from "../View/ViewData";
import Footer from "../../components/Footer/Footer";


export default function HomePage ({setAuth}) {
    const [isActive, setIsActive] = useState(false);

  const handleIcon = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsActive(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setIsActive(false);
  };
  const logout = (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    setAuth(false);
    toast.success('Sign-Out Successfully')

  }
    return (
        <>

    <header className="header">

        <a href="#" className="logo"> <FontAwesomeIcon icon={faPaw} className="paw"/> Petify Admin</a>

        <nav className={`navbar ${isActive ? 'active' : ''}`}>
            <a href="#home">home</a>
            <a href="#form_id">upload</a>
            <a href="#data">view</a>
            <a href="#">users</a>
            <a href="#">feedbacks</a>
            <a onClick={logout}>sign-out</a>
        </nav>

        <div className="icons">
          <button id="menu-btn" onClick={handleIcon}><FontAwesomeIcon icon={faBars}/></button>
            
        </div>
    </header>

    <section className="home" id="home">
        <div className="content" onScroll={handleScroll}>
            <h3>Got some pets <br/>
            share with needy ones</h3>
        </div>
        <img src={img} alt="" className="wave"/>
    </section>

    <FormData/>

    <ViewData/>

    <Footer />
</>
    )
};