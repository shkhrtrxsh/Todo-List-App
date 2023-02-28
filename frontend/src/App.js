import "./App.css";
import { BrowserRouter } from "react-router-dom";
import {Route,Routes} from 'react-router-dom'
import { Form } from "./components/Form";
import { UserList } from "./components/UserList";
import Signup from './components/Signup'
import Login from './components/Login'
import React,{useState} from 'react'
import NavBar from './components/NavBar'
import {useEffect} from 'react'
import {auth} from './firebase'

function App() {
  const [user,setUser]= useState('');
  useEffect(()=>{
auth.onAuthStateChanged((user)=>{
  if(user) setUser(user)
  else setUser(null)
})
  },[])
  return (
    <BrowserRouter>
    <NavBar user={user}/>
    <Routes>
      <Route exact path='/' element={<><Form/><UserList/></>}>
      </Route>
      <Route path='/login'element={<Login/>}>
      </Route>
      <Route path='/signup'element={<Signup/>}>
      </Route>
    </Routes>
    </BrowserRouter>
    
  );
}

export default App;
