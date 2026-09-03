import React from 'react';
import { Icons } from '../../../shared/utils/icons';

const ChannelHeader = ({ channel }) => {
  const isPrivate = channel?.is_private;
  const channelName = channel?.name || 'general';
  
  return (
    <div className="flex flex-col border-b border-gray-200 bg-white shrink-0 shadow-sm z-10 px-5 pt-3">
      {/* Top Row: Channel Info & Actions */}
      <div className="flex items-center justify-between pb-3">
        {/* Left Side: Channel Name */}
        <div className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-100 px-2 py-1 -ml-2 rounded-md transition-colors">
          {isPrivate ? (
            <Icons.Lock className="text-gray-900" fontSize="small" />
          ) : (
            <Icons.Hash className="text-gray-900" fontSize="small" />
          )}
          <span className="text-[17px] font-bold text-gray-900 leading-none">{channelName}</span>
          <Icons.ArrowDown className="text-gray-500 mt-0.5" fontSize="small" />
        </div>

        {/* Right Side: Members & Huddle */}
        <div className="flex items-center gap-3">
          {/* Members Stack */}
          <div className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md transition-colors border border-transparent hover:border-gray-200">
            <div className="flex -space-x-1.5 mr-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">JD</div>
              <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">AS</div>
              <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">MJ</div>
            </div>
            <span className="text-sm font-medium text-gray-700">1,417</span>
          </div>

          {/* Huddle Button */}
          <div className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md transition-colors border border-transparent hover:border-gray-200 flex items-center justify-center">
            <Icons.Headset className="text-gray-700" fontSize="small" />
          </div>
        </div>
      </div>

      {/* Bottom Row: Tabs */}
      <div className="flex items-center gap-6 mt-1">
        <button className="flex items-center gap-1.5 pb-2 border-b-2 border-blue-600 text-blue-600 font-medium text-sm transition-colors">
          <Icons.Messages fontSize="small" style={{ fontSize: '16px' }} />
          Messages
        </button>
        <button className="flex items-center gap-1.5 pb-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors">
          <Icons.Drafts fontSize="small" style={{ fontSize: '16px' }} />
          Files
        </button>
        <button className="flex items-center gap-1.5 pb-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors">
          <Icons.Pin fontSize="small" style={{ fontSize: '16px' }} />
          Pins
        </button>
        <button className="flex items-center gap-1.5 pb-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm transition-colors">
          <Icons.Add fontSize="small" style={{ fontSize: '16px' }} />
        </button>
      </div>
    </div>
  );
};

export default ChannelHeader;