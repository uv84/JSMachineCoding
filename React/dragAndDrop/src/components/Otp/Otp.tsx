import React, {  useEffect, useRef, useState } from 'react'
import './Otp.css'

function Otp({ otpLength = 6 }: { otpLength?: number }) {
    const [otpFields, setOtpFields] = useState(Array(otpLength).fill(''));
    const ref = useRef<(HTMLInputElement | null)[]>([]);

    type NewType = React.KeyboardEvent<HTMLInputElement>;

    const handleKeyDown = (e: NewType, index: number) => {
        const key = e.key;
        if (key === "ArrowLeft") {
            if (index > 0) ref.current[index - 1]?.focus();
            return;
        }
        if (key === "ArrowRight") {
            if (index + 1 < otpFields.length) ref.current[index + 1]?.focus();
            return;
        }

        const copyOtpFields = [...otpFields];
        if (key === "Backspace") {
            copyOtpFields[index] = "";
            setOtpFields(copyOtpFields);
            if (index > 0) ref.current[index - 1]?.focus();
            return;
        }

        if (isNaN(Number(key))) {
            return;
        }

        copyOtpFields[index] = key;
        if (index + 1 < otpFields.length) ref.current[index + 1]?.focus();
        setOtpFields(copyOtpFields);
    };
    function handlepast  (e: React.ClipboardEvent<HTMLInputElement>) {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, otpLength);

        const copyOtpFields = [...otpFields];   
        for (let i = 0; i < otpLength; i++) {
            copyOtpFields[i] = pasteData[i];

        }
        setOtpFields(copyOtpFields);
        const nextIndex = pasteData.length >= otpLength ? otpLength - 1 : pasteData.length;
        ref.current[nextIndex]?.focus();    

     }  

    useEffect(() => {
        ref.current[0]?.focus();
    }, []);

    return (
        <div onPaste={handlepast}
        className="container">
            {otpFields.map((value, index) => (
                <input
                    key={index}
                    ref={(currentInput) => { ref.current[index] = currentInput; }}
                    type="text"
                    value={value}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                />
            ))}
        </div>
    );
}

export default Otp