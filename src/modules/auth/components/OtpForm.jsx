import { useState } from 'react';
import Button from '../../../shared/components/Button/Button';
import Input from '../../../shared/components/Input/Input';

const OtpForm = ({ onSubmit, onResend, fieldErrors = {}, clearFieldError, isLoading }) => {
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 6) {
      setOtp(value);
    }

    if (clearFieldError) {
      clearFieldError('otp');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(otp);
  };

  const otpError = fieldErrors['otp'] ? fieldErrors['otp'][0] : undefined;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        label="Enter OTP"
        type="text"
        name="otp"
        value={otp}
        onChange={handleChange}
        error={otpError}
        placeholder="Enter 6-digit code"
        maxLength="6"
        className="text-center tracking-widest text-lg"
      />
      <Button type="submit" isLoading={isLoading}>
        {isLoading ? 'Verifying...' : 'Verify OTP'}
      </Button>
      <div className="mt-4 text-center text-sm">
        Didn't receive code? <span onClick={onResend} className="text-primary font-semibold cursor-pointer hover:underline">Resend OTP</span>
      </div>
    </form>
  );
};

export default OtpForm;
