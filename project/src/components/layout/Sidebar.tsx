import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Calendar as CalendarIcon, 
  Dumbbell, 
  Apple, 
  Activity, 
  Award, 
  BarChart2, 
  Settings as SettingsIcon,
  X
} from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Calendar', href: '/calendar', icon: CalendarIcon },
    { name: 'Training Coach', href: '/training-coach', icon: Dumbbell },
    { name: 'Diet Coach', href: '/diet-coach', icon: Apple },
    { name: 'Injury Coach', href: '/injury-coach', icon: Activity },
    { name: 'Competitions', href: '/competitions', icon: Award },
    { name: 'Stats', href: '/stats', icon: BarChart2 },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div className="flex items-center">
          <Dumbbell className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">SportCoachAI</span>
        </div>
        {onClose && (
          <button
            type="button"
            className="md:hidden -mr-3 h-10 w-10 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={clsx(
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <item.icon
                  className={clsx(
                    'mr-3 h-5 w-5',
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
            U
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">User</p>
            <p className="text-xs text-gray-500">Triathlete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;