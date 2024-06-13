import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from "../assets/LoginBg.jpg"


const LoginPage = () => {
  const navigate = useNavigate();

  const goToDashboard= ()=>{
    navigate('/dashboard');
  }
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="md:w-1/2 flex flex-col justify-center items-center bg-white px-4 py-8 md:px-16">
      <div
    className="md:w-2/3 flex flex-col justify-center items-center bg-white px-6 py-6 md:px-10 rounded-xl"
  >
    <h2 className="text-4xl font-semibold text-gray-700 mb-5">Login</h2>
    <form className="w-full max-w-sm">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-xl font-bold mb-2"
          htmlFor="email"
        >
          Enter your email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Email"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-xl font-bold mb-2"
          htmlFor="password"
        >
          Enter your password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
        />
        <a
          href="/LandingPage"
          className="text-xs text-purple-600 hover:text-purple-800"
        >
          Forgot password?
        </a>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={goToDashboard}
        >
          Login
        </button>
        <a
          href="Signup"
          className="inline-block align-baseline p-5 font-bold text-sm text-purple-500 hover:text-purple-800"
        >
          Don't have an account? Signup now
        </a>
      </div>
    </form>
  </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center bg-purple-100 p-4 md:p-12">
        <div>
          <h3 className="text-2xl text-purple-900 font-semibold">Carbon footprint management solutions</h3><br></br>
          <p className="text-purple-900"></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
