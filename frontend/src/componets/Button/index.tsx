import { ReactNode } from 'react';
import './button.scss';

interface ButtonProps {
    children?: ReactNode;
    onClick: () => void;
}

function Button({ onClick, children }: ButtonProps) {
    return (
        <button className="button" onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
