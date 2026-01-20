import React from 'react';

const Card = ({ children, className = '', noPadding = false, glass = true }) => {
    const baseStyles = 'rounded-lg border border-border-color shadow-sm';
    const glassStyles = glass ? 'bg-glass-bg backdrop-blur-md border-glass-border' : 'bg-surface-color';
    const paddingStyles = noPadding ? '' : 'p-6';

    return (
        <div className={`${baseStyles} ${glassStyles} ${paddingStyles} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
