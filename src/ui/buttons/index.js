import React from 'react';

const Button = ({...props, children}) => {
    return (
        <button className={...props}>
            {children}
        </button>
    );
}

export default Button;
