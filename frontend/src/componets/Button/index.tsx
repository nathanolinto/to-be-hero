import { ComponentPropsWithRef, ReactNode } from 'react';
import './button.scss';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
    children?: ReactNode;
}

function Button({ children, ...rest }: ButtonProps) {
    return (
        <button className="button" {...rest}>
            {children}
        </button>
    );
}

export default Button;
