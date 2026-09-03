
import { Icons } from '../../../shared/utils/icons';

const WorkspaceTopbar = () => {
  return (
    <div className="h-11 bg-[#07074A] flex items-center justify-center px-4 shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>

      <div className="flex-1 max-w-2xl mx-4 relative group">
        <button className="w-full bg-white/20 hover:bg-white/30 text-white/90 text-sm h-7 px-3 rounded-md flex items-center justify-center transition-colors border border-white/10 shadow-sm overflow-hidden">
          <span className="flex items-center gap-1.5 opacity-80">
            <Icons.Search fontSize="small" style={{ fontSize: '16px' }} />
            Search Workspace
          </span>
        </button>
      </div>

    </div>
  );
};

export default WorkspaceTopbar;

