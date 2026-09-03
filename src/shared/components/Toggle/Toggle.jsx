

const Toggle = ({ checked, onChange, label, description, id }) => {
  return (
    <div className="flex items-start gap-3 mt-2">
      <div className="flex items-center h-5">
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange(!checked)}
          className={`
            relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            ${checked ? 'bg-primary' : 'bg-gray-200'}
          `}
        >
          <span
            aria-hidden="true"
            className={`
              pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
              ${checked ? 'translate-x-4' : 'translate-x-0'}
            `}
          />
        </button>
      </div>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <div className="text-sm font-medium text-gray-900">
            </div>
          )}
            <p className="text-xs text-gray-500">
              {description}
            </p>
        </div>
      )}
    </div>
  );
};

export default Toggle;

