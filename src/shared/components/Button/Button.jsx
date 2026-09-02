
const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', isLoading = false, disabled = false, ...props }) => {
  const baseStyles = 'px-5 py-2.5 rounded-md text-base font-medium transition-opacity w-full flex justify-center items-center';
  
  const variants = {
    primary: 'bg-primary text-white border-none',
    secondary: 'bg-gray-100 text-gray-800 border-none',
    outline: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
  };

  const isDisabled = disabled || isLoading;

  return (
    <button 
      type={type} 
      className={`${baseStyles} ${variants[variant]} ${isDisabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'} ${className}`} 
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
