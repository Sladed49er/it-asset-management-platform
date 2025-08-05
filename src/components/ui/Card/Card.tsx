import React from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Keep both old and new variant types for compatibility
  variant?: 
    | 'elevated' | 'filled' | 'outlined'
    | 'default' | 'primary' | 'success' | 'warning' | 'danger'; // Legacy support
  size?: 'small' | 'medium' | 'large';
  clickable?: boolean;
  color?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning';
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: React.ReactNode;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  centered?: boolean;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface CardSubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: string; // Add this line
}

// Main Card Component
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'elevated', size = 'medium', clickable = false, color = 'default', ...props }, ref) => {
    // Map legacy variants to new MD3 variants and colors
    const getMappedVariant = (variant: string) => {
      const variantMap: Record<string, string> = {
        'default': 'elevated',
        'primary': 'elevated',
        'success': 'elevated', 
        'warning': 'elevated',
        'danger': 'elevated'
      };
      return variantMap[variant] || variant;
    };

    const getMappedColor = (variant: string, color: string) => {
      if (color !== 'default') return color;
      
      const colorMap: Record<string, string> = {
        'primary': 'primary',
        'success': 'success',
        'warning': 'warning', 
        'danger': 'error'
      };
      return colorMap[variant] || 'default';
    };

    const mappedVariant = getMappedVariant(variant);
    const mappedColor = getMappedColor(variant, color);

    return (
      <div
        ref={ref}
        className={clsx(
          styles.card,
          styles[mappedVariant],
          {
            [styles[size]]: size !== 'medium',
            [styles.clickable]: clickable,
            [styles[mappedColor]]: mappedColor !== 'default',
          },
          className
        )}
        {...props}
      />
    );
  }
);

// Card Header
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, actions, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.header,
          {
            [styles.headerWithActions]: actions,
          },
          className
        )}
        {...props}
      >
        <div>{children}</div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    );
  }
);

// Card Content
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, noPadding = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.content,
          {
            [styles.contentNoPadding]: noPadding,
          },
          className
        )}
        {...props}
      />
    );
  }
);

// Card Footer
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, centered = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.footer,
          {
            [styles.footerCentered]: centered,
          },
          className
        )}
        {...props}
      />
    );
  }
);

// Card Title
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={clsx(styles.title, className)}
        {...props}
      />
    );
  }
);

// Card Subtitle
export const CardSubtitle = React.forwardRef<HTMLParagraphElement, CardSubtitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={clsx(styles.subtitle, className)}
        {...props}
      />
    );
  }
);

// Set display names
Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';
CardTitle.displayName = 'CardTitle';
CardSubtitle.displayName = 'CardSubtitle';