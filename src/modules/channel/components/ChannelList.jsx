import React from 'react';

const ChannelList = () => {
  return (
    <div className="mb-4">
      <div className="px-5 mb-1 text-xs font-semibold uppercase tracking-wider text-white/50 flex items-center justify-between group cursor-pointer hover:text-white/70">
        Channels
        <span className="opacity-0 group-hover:opacity-100">+</span>
      </div>
      <div className="space-y-0.5 px-3">
        {/* Placeholder channels for now */}
        <div className="flex items-center gap-2 px-2 py-1 bg-blue-600/90 text-white rounded cursor-pointer">
          <span className="opacity-70 text-lg leading-none">#</span> general
        </div>
        <div className="flex items-center gap-2 px-2 py-1 hover:bg-white/10 rounded cursor-pointer text-white/80">
          <span className="opacity-50 text-lg leading-none">#</span> random
        </div>
      </div>
    </div>
  );
};

export default ChannelList;
