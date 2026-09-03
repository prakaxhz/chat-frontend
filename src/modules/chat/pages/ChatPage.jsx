
import { Icons } from '../../../shared/utils/icons';
import { useChannel } from '../../channel/hooks/useChannel';
import ChannelHeader from '../../channel/components/ChannelHeader';
import ChatWelcome from '../components/ChatWelcome';

const ChatPage = () => {
  const { activeChannel, isFetching } = useChannel();

  if (isFetching && !activeChannel) {
    return (
      <div className="flex-1 flex flex-col h-full bg-white relative items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!activeChannel) {
    return <ChatWelcome />;
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      <ChannelHeader channel={activeChannel} />

      {/* Chat Body (Messages) */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-white custom-scrollbar">
        {/* Mock Message */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded bg-indigo-500 flex items-center justify-center text-white font-bold shrink-0">
            A
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-gray-900 text-[15px]">Alice Smith</span>
              <span className="text-xs text-gray-500">11:30 AM</span>
            </div>
            <div className="text-gray-800 mt-1">
              Welcome to the general channel! This is where we discuss everything.
            </div>
          </div>
        </div>
        
        {/* Mock Message */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded bg-green-600 flex items-center justify-center text-white font-bold shrink-0">
            B
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-gray-900 text-[15px]">Bob Jones</span>
              <span className="text-xs text-gray-500">11:35 AM</span>
            </div>
            <div className="text-gray-800 mt-1">
              Sounds great, Alice! I'll invite the rest of the team.
            </div>
            {/* Mock Thread Reply bubble */}
            <div className="mt-2 flex items-center gap-2 cursor-pointer group">
              <div className="flex -space-x-1">
                <div className="w-5 h-5 rounded-full bg-indigo-500 border border-white"></div>
              </div>
              <span className="text-sm text-blue-600 font-medium group-hover:underline">1 reply</span>
              <span className="text-xs text-gray-400">Last reply today at 11:42 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input Area */}
      <div className="p-5 pt-0 shrink-0 bg-white">
        <div className="border border-gray-400 rounded-xl overflow-hidden focus-within:border-gray-600 focus-within:ring-1 focus-within:ring-gray-600 transition-shadow">
          <div className="bg-gray-50 px-2 py-2 flex gap-1 border-b border-gray-200 text-gray-500">
            <button className="p-1 hover:bg-gray-200 rounded flex"><Icons.Bold fontSize="small" /></button>
            <button className="p-1 hover:bg-gray-200 rounded flex"><Icons.Italic fontSize="small" /></button>
            <button className="p-1 hover:bg-gray-200 rounded flex"><Icons.Strike fontSize="small" /></button>
            <div className="w-px bg-gray-300 mx-1"></div>
            <button className="p-1 hover:bg-gray-200 rounded flex"><Icons.Link fontSize="small" /></button>
          </div>
          <div className="p-3 bg-white">
            <input 
              type="text" 
              placeholder={`Message #${activeChannel?.name || 'general'}`}
              className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="px-2 py-2 flex justify-between items-center bg-white">
            <div className="flex gap-1 text-gray-500">
              <button className="p-1.5 hover:bg-gray-100 rounded-full flex"><Icons.AddCircle fontSize="small" /></button>
              <button className="p-1.5 hover:bg-gray-100 rounded-full flex"><Icons.Emoji fontSize="small" /></button>
              <button className="p-1.5 hover:bg-gray-100 rounded-full flex"><Icons.Mentions fontSize="small" /></button>
            </div>
            <button className="w-8 h-8 rounded bg-gray-200 text-gray-400 hover:text-white hover:bg-green-600 flex items-center justify-center transition-colors">
              <Icons.Send fontSize="small" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

