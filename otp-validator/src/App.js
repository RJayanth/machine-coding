import './App.css';
import { useEffect, useState, useRef } from 'react';

const CONFIG_OTP_LENGTH = 5;
function App() {
  const [otpArr, setOtpArr] = useState(new Array(CONFIG_OTP_LENGTH).fill(''));
  const otpRef = useRef([]);

  useEffect(() => {
    otpRef?.current?.[0]?.focus();
  }, []);

  const handleOnChange = (e, i) => {
    const value = e.target.value?.trim();
    if (isNaN(value) || !value?.length) {
      return;
    }
    setOtpArr((prev) => {
      const newArr = [...prev];
      newArr[i] = value.slice(-1);
      return newArr;
    });
    otpRef.current?.[i + 1]?.focus();
  };

  const handleOnKeyUp = (e, i) => {
    if (e.keyCode === 8) {
      if (e.target.value) {
        setOtpArr((prev) => {
          const newArr = [...prev];
          newArr[i] = '';
          return newArr;
        });
      } else {
        otpRef.current?.[i - 1]?.focus();
        otpRef.current?.[i - 1]?.select();
      }
    }
  };

  return (
    <div className="App">
      <div className="otp-container">
        <div className="otp-header">OTP Validator</div>
        <div className="otp-fields-container">
          {otpArr.map((otp, i) => {
            return (
              <input
                type="text"
                key={i}
                value={otpArr[i]}
                placeholder="*"
                className="otp-field"
                onChange={(e) => handleOnChange(e, i)}
                ref={(input) => {
                  otpRef.current[i] = input;
                }}
                onKeyUp={(e) => {
                  handleOnKeyUp(e, i);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
