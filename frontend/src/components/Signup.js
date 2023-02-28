import React, { useState } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import {auth} from '../firebase'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  // To Store the value from Frontend
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  // To handle the Default
  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
        const result= await auth.createUserWithEmailAndPassword(userName,userEmail);
        M.toast({html: `welcome ${result.user.email}`, classes:'green'})
        navigate('/')
    }catch(error){
        M.toast({html: error.message, classes:'red'})
    }
    
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-8 mx-auto">
            <div className="flex flex-col text-center w-full mb-6">
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
                Sign Up
              </h1>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="name"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={userName}
                      onChange={(event) => setUserName(event.target.value)}
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={userEmail}
                      onChange={(event) => {
                        setUserEmail(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                <button class="flex-no-shrink p-2 border-2 rounded text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};
