import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import MapComponent from '../map/Map';
import Login from '../login/Login';
import Register from '../register/Register';
import { AuthContext } from '../auth_context/AuthContext'; // Import the AuthContext

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext); // Access isLoggedIn from AuthContext
  const [tab, setTab] = useState('login');

  return (
    <div className="">
      {isLoggedIn ? (
        <MapComponent />
      ) : (
        <>
          <div className="flex justify-center mb-4">
          <button
              className={`px-4 py-2 focus:outline-none ${tab === 'login' ? 'bg-green-500' : 'text-gray-600'}`}
              onClick={() => setTab('login')}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 focus:outline-none ${tab === 'register' ? 'bg-green-500' : 'text-gray-600'}`}
              onClick={() => setTab('register')}
            >
              Register
            </button>
          </div>
          {tab === 'login' && (
              <Login />
          )}
          {tab === 'register' && (
              <Register />
          )}
        </>
      )}
    </div>

  );
};

export default Home;
