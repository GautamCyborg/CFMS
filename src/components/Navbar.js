import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800"> 
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-4"> 
                    <div className="flex space-x-7">
                    
                        <div className="hidden md:flex items-center space-x-4">
                            <a href="/Dashboard" className="py-2 px-3 text-gray-300 text-lg font-semibold hover:bg-gray-700 rounded-md transition duration-300 ease-in-out">Home</a>
                            <a href="/ChloropathMap" className="py-2 px-3 text-gray-300 text-lg font-semibold hover:bg-gray-700 rounded-md transition duration-300 ease-in-out">Chloropeth Map</a>
                            <a href="/CustomIcon" className="py-2 px-3 text-gray-300 text-lg font-semibold hover:bg-gray-700 rounded-md transition duration-300 ease-in-out">Custom Mark</a>
                            <a href="/Draw" className="py-2 px-3 text-gray-300 text-lg font-semibold hover:bg-gray-700 rounded-md transition duration-300 ease-in-out">Draw</a>
                            <a href="/SearchMap" className="py-2 px-3 text-gray-300 text-lg font-semibold hover:bg-gray-700 rounded-md transition duration-300 ease-in-out">Find</a>
                            <a href="/Audit" className="py-2 px-3 text-gray-300 text-lg font-semibold hover:bg-gray-700 rounded-md transition duration-300 ease-in-out">Start Audit</a>                           
                            <a href="/GeojsonVerify" className="py-2 px-3 text-gray-300 text-lg font-semibold hover:bg-gray-700 rounded-md transition duration-300 ease-in-out">Verify Geo JSON</a>                           
                            <a href="/" className="py-2 px-3 text-gray-300 text-lg font-semibold hover:bg-gray-700 rounded-md transition duration-300 ease-in-out">Logout</a>                           
        
                        </div>
                    </div>
                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button className="outline-none mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
                            <svg className="w-6 h-6 text-gray-300 hover:text-gray-100"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-gray-700 p-4`}>
                <a href="/Dashboard" className="block py-2 px-4 text-sm text-gray-300 hover:bg-gray-600 rounded">Home</a>
                <a href="/ChloropathMap" className="block py-2 px-4 text-sm text-gray-300 hover:bg-gray-600 rounded">Chloropeth Map</a>
                <a href="/Draw" className="block py-2 px-4 text-sm text-gray-300 hover:bg-gray-600 rounded">Leaflet Draw</a>
                <a href="/CustomIcon" className="block py-2 px-4 text-sm text-gray-300 hover:bg-gray-600 rounded">Custom Icon</a>
                <a href="/SearchMap" className="block py-2 px-4 text-sm text-gray-300 hover:bg-gray-600 rounded">Find</a>
                <a href="/Audit" className="block py-2 px-4 text-sm text-gray-300 hover:bg-gray-600 rounded">Start Audit</a>
                <a href="/GeojsonVerify" className="block py-2 px-4 text-sm text-gray-300 hover:bg-gray-600 rounded">Verify Geo JSON</a>
                <a href="/" className="block py-2 px-4 text-sm text-gray-300 hover:bg-gray-600 rounded">Logout</a>
                  </div>
        </nav>
    );
};

export default Navbar;
