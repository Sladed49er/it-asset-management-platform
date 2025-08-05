import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Keep both old and new variant types for compatibility
  variant?: 
    | 'filled' | 'filledTonal' | 'outlined' | 'text' | 'elevated' | 'fab'
    | 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'; // Legacy support
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'filled',
      size = 'medium',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Map legacy variants to new MD3 variants
    const getMappedVariant = (variant: string) => {
      const variantMap: Record<string, string> = {
        'primary': 'filled',
        'secondary': 'filledTonal', 
        'outline': 'outlined',
        'ghost': 'text',
        'danger': 'filled'
      };
      return variantMap[variant] || variant;
    };

    const mappedVariant = getMappedVariant(variant);

    const buttonClasses = clsx(
      styles.button,
      styles[mappedVariant],
      {
        [styles[size]]: size !== 'medium',
        [styles.fullWidth]: fullWidth,
        [styles.loading]: loading,
      },
      className
    );

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled}
        {...props}
      >
        {loading && <span className={styles.loadingSpinner} />}
        {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
        {children}
        {rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';