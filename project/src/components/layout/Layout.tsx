import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { state } = useAppContext();
  
  // Check if there are any active injuries
  const hasActiveInjuries = state.injuries.some(
    (injury) => injury.status === 'active'
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>
      
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative flex flex-col w-full max-w-xs bg-white h-full">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Injury alert banner */}
        {hasActiveInjuries && (
          <div className="bg-injury-500 text-white px-4 py-2 text-center animate-fade-in">
            <p className="text-sm font-medium">
              You have active injuries. Check the Injury Coach for recommendations.
            </p>
          </div>
        )}
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;