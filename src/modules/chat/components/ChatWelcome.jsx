import { Icons } from '../../../shared/utils/icons';

const ChatWelcome = () => {
  return (
    <div className="flex-1 flex flex-col h-full bg-white relative items-center justify-center animate-in fade-in duration-300">
      <div className="flex flex-col items-center text-center max-w-md mx-auto p-6">
        <div className="w-20 h-20 bg-blue-50 text-primary rounded-full flex items-center justify-center mb-6 shadow-sm">
          <Icons.Messages style={{ fontSize: '40px' }} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to the chat!</h2>
        <p className="text-gray-500 mb-8 text-sm">
          It looks like you don't have any channels yet. Create a channel in the sidebar to get started!
        </p>
      </div>
    </div>
  );
};

export default ChatWelcome;