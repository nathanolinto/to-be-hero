import { ChangeEvent, InputHTMLAttributes, useCallback, useEffect, useState } from 'react';
import './input.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    value?: string;
}

function Input({ name, label, value }: InputProps) {
    const [isActive, setIsActive] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleSelectInput = useCallback(() => {
        setIsActive(inputValue ? true : false);
    }, [inputValue]);
    const handleOnFocus = () => {
        setIsActive(true);
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    useEffect(() => {
        if (inputValue) {
            handleSelectInput();
        }
    }, [handleSelectInput, inputValue]);
    return (
        <div className="input">
            <label htmlFor={name} className={isActive ? 'active' : ''}>
                {label}
            </label>
            <input
                id={name}
                type="text"
                onFocus={handleOnFocus}
                onBlur={handleSelectInput}
                onChange={handleChange}
                value={inputValue}
            />
        </div>
    );
}

export default Input;
