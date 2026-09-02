import { Outlet } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 font-sans p-4">
      <div className="bg-white p-6 sm:p-10 rounded-lg shadow-md w-full max-w-md box-border">
        <div className="text-center mb-6">
          <h2 className="m-0 mb-2 text-gray-800 text-2xl font-bold">{title}</h2>
          {subtitle && <p className="m-0 text-gray-500 text-sm">{subtitle}</p>}
        </div>
        <div>
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
