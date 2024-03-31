import React from 'react';

const Button = ({ onClick, action, className, children }) => {
    return (
        <button onClick={onClick} action={action} className={className}>
            {children}
        </button>
    );
};

export default Button;
