import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', fullWidth = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-primary text-white hover:bg-primary/90 cursor-pointer': variant === 'default',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer': variant === 'outline',
            'hover:bg-accent hover:text-accent-foreground cursor-pointer': variant === 'ghost',
            'h-9 px-4 text-sm': size === 'sm',
            'h-10 px-6 text-base': size === 'md',
            'h-11 px-8 text-lg': size === 'lg',
            'w-full': fullWidth,
          },
          className,
          'cursor-pointer !important'
        )}
        style={{ cursor: 'pointer' }}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button; 