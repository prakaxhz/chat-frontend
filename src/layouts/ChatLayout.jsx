import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../modules/auth/hooks/useAuth';
import ConfirmationModal from '../shared/components/Modal/ConfirmationModal';
import { Icons } from '../shared/utils/icons';

const ChatLayout = () => {
  const { handleLogout, user } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    handleLogout();
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <div className="w-[260px] bg-primary text-white flex flex-col justify-between">
        {/* Sidebar Header */}
        <div className="p-5">
          <h2 className="text-xl font-bold m-0">Workspace</h2>
        </div>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-blue-900 bg-blue-950 flex flex-col gap-3">
          <div className="text-sm truncate">
            {user?.name ? <span className="font-semibold">{user.name}</span> : 'User Profile'}
            {user?.email && <div className="text-xs text-blue-300 truncate">{user.email}</div>}
          </div>
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-2 text-sm py-2 px-3 rounded text-red-300 hover:bg-white/10 hover:text-red-400 transition-colors"
          >
            <Icons.Logout fontSize="small" />
            Sign Out
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content */}
        <Outlet />
      </div>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        title="Sign Out"
        description="Are you sure you want to sign out? You will need to sign back in to access your workspace."
        icon={Icons.Logout}
        confirmText="Sign Out"
        cancelText="Cancel"
        variant="danger"
      >
        {/* Optional inner content matching the "DANGER" list style */}
        <div className="bg-red-50 rounded-xl p-4">
          <div className="flex items-start gap-3 text-sm text-gray-700 font-medium">
            <Icons.Warning fontSize="small" className="text-red-500 mt-0.5 shrink-0" />
            <p className="m-0 leading-relaxed text-gray-800">You won't receive any new messages or notifications until you log back in.</p>
          </div>
        </div>
      </ConfirmationModal>
    </div>
  );
};

export default ChatLayout;
