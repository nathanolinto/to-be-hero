import { ChangeEvent, InputHTMLAttributes, useCallback, useEffect, useState } from 'react';
import './input.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    value: string;
    setValue: (value: string) => void;
    setError: (value: boolean) => void;
    error?: boolean;
    errorMessage?: string;
}

function Input({ name, label, value, setValue, error, setError, errorMessage }: InputProps) {
    const [isActive, setIsActive] = useState(false);

    const handleSelectInput = useCallback(() => {
        setIsActive(value ? true : false);
    }, [value, setIsActive]);
    const handleOnFocus = () => {
        setIsActive(true);
        setValue(error ? '' : value);
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        setValue(event.target.value);
    };
    useEffect(() => {
        if (value) {
            handleSelectInput();
        }
    }, [handleSelectInput, value]);
    return (
        <>
            <div className={`input ${error ? 'error' : ''}`}>
                <div>
                    <label htmlFor={name} className={isActive ? 'active' : ''}>
                        {label}
                    </label>
                    <input
                        id={name}
                        type="text"
                        onFocus={handleOnFocus}
                        onBlur={handleSelectInput}
                        onChange={handleChange}
                        value={value}
                    />
                </div>
            </div>
            {error && <div className="errorMessage">{errorMessage}</div>}
        </>
    );
}

export default Input;
