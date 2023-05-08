import React, {useState, useEffect} from "react";
import DataForm from "./components/Form/data_form";
import DataDetails from "./components/Table/DataTable/data";
import UpdateDataForm from "./pages/Update/update_form";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import { PetifyContextProvider } from "./context/context";
import Login from "./pages/Login/Login";
import HomePage from "./pages/Home/Index";

function App() {
  const[isAuthenticated, setIsAuthenticated] = useState(false)
  
  const setAuth  = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try{
      const response = await fetch('http://localhost:8000/auth/is-verify',{
        method: 'GET',
        headers: {token: localStorage.token}
      });

      const parseRes = await response.json();
      
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    }catch(error){
      console.log(error);
    }
  };

  useEffect(()=> {
    isAuth();
  },[]);
  
  return (
    <PetifyContextProvider>
    <div>
      <Router>
        <Routes>
        <Route 
        path='/' 
        element ={
        !isAuthenticated ? 
        (<Login setAuth={setAuth} />
        ) : (
          <Navigate to='/homepage'/>
        )
      }/>
      <Route 
        path='/homepage' 
        element ={
        isAuthenticated ? 
        (<HomePage setAuth={setAuth} />
        ) : (
          <Navigate to='/'/>
        )
      }/>
      <Route 
        path='/upload' 
        element ={
        isAuthenticated ? 
        (<DataForm setAuth={setAuth} />
        ) : (
          <Navigate to='/'/>
        )
      }/>
      <Route 
        path='/data' 
        element ={
        isAuthenticated ? 
        (<DataDetails setAuth={setAuth} />
        ) : (
          <Navigate to='/'/>
        )
      }/>
      <Route 
        path='/updatedataform/:id' 
        element ={
        isAuthenticated ? 
        (<UpdateDataForm setAuth={setAuth} />
        ) : (
          <Navigate to='/'/>
        )
      }/>
        </Routes>
      </Router>
    </div>
    </PetifyContextProvider>
  );
}
export default App;
