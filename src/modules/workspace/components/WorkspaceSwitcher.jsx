import { Icons } from '../../../shared/utils/icons';

const WorkspaceSwitcher = ({ workspaces, activeWs, selectWorkspace, onOpenCreateModal, onOpenLogoutModal }) => {
  return (
    <div className="w-[70px] bg-[#222222] flex flex-col items-center py-4 gap-3 shrink-0 h-full">
      {workspaces.map(ws => (
        <div 
          key={ws._id} 
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold cursor-pointer transition-all ${activeWs?._id === ws._id ? 'bg-white/20 border-2 border-white/40' : 'bg-white/10 hover:bg-white/20 border-2 border-transparent'}`}
          title={ws.name}
          onClick={() => selectWorkspace(ws)}
        >
          {ws.name.charAt(0).toUpperCase()}
        </div>
      ))}
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white/70 border border-white/20 hover:border-white/50 cursor-pointer mt-2 bg-transparent"
        onClick={onOpenCreateModal}
        title="Add Workspace"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
      </div>
      <div className="mt-auto">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white/50 hover:text-white/90 hover:bg-white/10 cursor-pointer"
          onClick={onOpenLogoutModal}
          title="Sign Out"
        >
          <Icons.Logout fontSize="small" />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSwitcher;