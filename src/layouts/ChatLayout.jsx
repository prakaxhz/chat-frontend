import { useState, useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { Icons } from '../shared/utils/icons';
import ConfirmationModal from '../shared/components/Modal/ConfirmationModal';

// Using clean barrel file imports
import { useAuth } from '../modules/auth';
import { useChannelSocket } from '../modules/channel';
import { 
  useWorkspace,
  WorkspaceSetupModal,
  WorkspaceSwitcher,
  WorkspaceSidebar,
  WorkspaceTopbar 
} from '../modules/workspace';

const ChatLayout = () => {
  const { workspaceCode } = useParams();
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();
  const { workspaces, activeWorkspace, isInitialized, isFetching, loadWorkspaces, selectWorkspace } = useWorkspace();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    loadWorkspaces();
  }, [loadWorkspaces]);

  // Hook handles socket events for channels automatically
  useChannelSocket(activeWorkspace?._id);

  // Sync active workspace with URL
  useEffect(() => {
    if (isInitialized && workspaces.length > 0) {
      if (!workspaceCode) {
        navigate(`/${workspaces[0].code}`, { replace: true });
      } else {
        const matchedWorkspace = workspaces.find(w => w.code === workspaceCode);
        if (matchedWorkspace && (!activeWorkspace || activeWorkspace.code !== workspaceCode)) {
          selectWorkspace(matchedWorkspace);
        } else if (!matchedWorkspace) {
          navigate(`/${workspaces[0].code}`, { replace: true });
        }
      }
    }
  }, [workspaces, workspaceCode, activeWorkspace, isInitialized, navigate, selectWorkspace]);

  const confirmLogout = () => {
    setIsLogoutModalOpen(false);
    handleLogout();
  };

  if (!isInitialized || isFetching) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show setup modal if user has no workspaces
  if (isInitialized && workspaces.length === 0) {
    return <WorkspaceSetupModal />;
  }

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-100">
      <WorkspaceTopbar />
      
      <div className="flex flex-1 overflow-hidden">
        <WorkspaceSwitcher 
          workspaces={workspaces}
          activeWs={activeWorkspace}
          selectWorkspace={selectWorkspace}
          onOpenCreateModal={() => {}} // TODO: implement create modal
          onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
        />
        <WorkspaceSidebar 
          activeWs={activeWorkspace}
          user={user}
        />
        
        <div className="flex-1 flex flex-col min-w-0 bg-white relative">
          <Outlet />
        </div>
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
