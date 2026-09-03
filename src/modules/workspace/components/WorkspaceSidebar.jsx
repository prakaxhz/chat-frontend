import ChannelList from '../../channel/components/ChannelList';
import ConversationList from '../../conversation/components/ConversationList';

const WorkspaceSidebar = ({ activeWs, user }) => {
  return (
    <div className="w-[260px] bg-primary text-white/90 flex flex-col shrink-0 h-full">
      {/* Workspace Header */}
      <div className="h-12 flex items-center px-4 border-b border-white/10 font-bold text-white cursor-pointer hover:bg-white/5 shadow-sm">
        <span className="truncate">{activeWs?.name || 'Workspace'}</span>
        <svg className="w-4 h-4 ml-auto opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
      
      {/* Navigation Lists */}
      <div className="flex-1 overflow-y-auto py-3 custom-scrollbar text-[15px]">
        <div className="px-3 mb-4 space-y-0.5">
          <div className="flex items-center gap-3 px-2 py-1 hover:bg-white/10 rounded cursor-pointer"><span className="opacity-70">💬</span> Threads</div>
          <div className="flex items-center gap-3 px-2 py-1 hover:bg-white/10 rounded cursor-pointer"><span className="opacity-70">@</span> Mentions & reactions</div>
          <div className="flex items-center gap-3 px-2 py-1 hover:bg-white/10 rounded cursor-pointer"><span className="opacity-70">📝</span> Drafts</div>
        </div>

        <ChannelList />
        <ConversationList user={user} />
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
