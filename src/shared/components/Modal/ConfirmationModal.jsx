import Modal from './Modal';
import Button from '../Button/Button';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  icon: Icon,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  children 
}) => {
  const variants = {
    danger: {
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
      confirmButton: 'bg-red-600 hover:bg-red-700 text-white',
    },
    warning: {
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-500',
      confirmButton: 'bg-orange-500 hover:bg-orange-600 text-white',
    },
    success: {
      iconBg: 'bg-green-50',
      iconColor: 'text-green-500',
      confirmButton: 'bg-green-600 hover:bg-green-700 text-white',
    },
    info: {
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white',
    }
  };

  const activeVariant = variants[variant] || variants.danger;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="flex items-start gap-4 mb-2">
        {Icon && (
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${activeVariant.iconBg} ${activeVariant.iconColor}`}>
            <Icon fontSize="medium" />
          </div>
        )}
        <div className="flex-1 pt-1">
          <h3 className="text-xl font-bold text-gray-900 m-0 mb-1 pr-6">{title}</h3>
          {description && <p className="text-sm text-gray-600 m-0 leading-relaxed">{description}</p>}
        </div>
      </div>
      
      {children && (
        <div className="mt-4 mb-6">
          {children}
        </div>
      )}

      <div className={`flex gap-3 w-full justify-end ${children ? '' : 'mt-6'}`}>
        <Button 
          variant="outline" 
          onClick={onClose}
          className="w-auto px-6 py-2 font-semibold shadow-sm"
        >
          {cancelText}
        </Button>
        <Button 
          onClick={onConfirm}
          className={`w-auto px-6 py-2 font-semibold shadow-sm ${activeVariant.confirmButton}`}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;

