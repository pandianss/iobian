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
        primary: 'bg-primary-gradient text-text-inverse shadow-md focus:ring-primary-color border border-white/10 hover:shadow-lg',
        secondary: 'bg-surface-color border border-primary-color text-primary-color hover:bg-bg-color shadow-sm focus:ring-primary-color',
        ghost: 'bg-transparent text-text-secondary hover:bg-slate-100 hover:text-text-primary',
        danger: 'bg-danger-gradient text-text-inverse shadow-md focus:ring-error-color hover:shadow-lg',
        gold: 'bg-gold-gradient text-text-primary font-bold shadow-md focus:ring-secondary-color hover:shadow-lg'
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
