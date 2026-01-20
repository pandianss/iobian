import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    icon: Icon,
    isLoading,
    disabled,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
        primary: 'bg-primary-color hover:bg-primary-hover text-white shadow-md focus:ring-primary-color',
        secondary: 'bg-white border-2 border-primary-color text-primary-color hover:bg-primary-color hover:text-white shadow-sm focus:ring-primary-color',
        ghost: 'bg-transparent text-text-secondary hover:bg-slate-100 hover:text-text-primary',
        danger: 'bg-error-color hover:bg-red-700 text-white shadow-md focus:ring-error-color',
        gold: 'bg-secondary-color hover:bg-yellow-500 text-text-primary shadow-md focus:ring-secondary-color'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="mr-2 animate-spin">◌</span>
            ) : Icon && (
                <Icon size={size === 'sm' ? 16 : 18} className="mr-2" />
            )}
            {children}
        </button>
    );
};

export default Button;
