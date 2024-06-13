import React from 'react';
import backgroundImage from '../assets/Background.jpg';
import Navbar from '../components/Navbar';

const Dashboard = () => {
return (<div>
    <Navbar/>
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="min-h-screen flex flex-col justify-center items-center">
      
      <div className="w-4/5 bg-white bg-opacity-20 flex flex-col justify-center items-center rounded-xl p-10" style={{ height: '700px' }}>
        <h1 className="text-white text-5xl font-bold shadow-lg">Welcome to our Maps Dashboard</h1>
        <p className="text-white text-xl mt-4 shadow"></p>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
