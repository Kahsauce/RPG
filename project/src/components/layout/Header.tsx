import { Menu, Bell } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          type="button"
          className="md:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <div className="flex-1 flex justify-center md:justify-start">
          <h1 className="text-xl font-semibold text-gray-900 hidden md:block">
            SportCoachAI
          </h1>
        </div>
        
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 rounded-full text-gray-500 hover:text-gray-900 focus:outline-none"
          >
            <Bell className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;