import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icons } from '../../utils/icons';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`bg-white rounded-xl shadow-xl w-full ${maxWidth} animate-in zoom-in-95 duration-200 overflow-hidden relative flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none cursor-pointer"
        >
          <Icons.Close fontSize="small" />
        </button>

        {title && (
          <div className="p-4 pb-0">
            <h3 className="text-lg font-semibold text-gray-900 m-0 pr-8">{title}</h3>
          </div>
        )}
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

