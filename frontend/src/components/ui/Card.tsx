import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingVariants = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const cardVariants = {
  default: 'bg-background',
  bordered: 'bg-background border-2 border-gray-200',
  elevated: 'bg-background shadow-lg',
};

export const Card = ({
  className,
  variant = 'default',
  padding = 'md',
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-lg',
        cardVariants[variant],
        paddingVariants[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = ({ className, children, ...props }: CardHeaderProps) => {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
};

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = ({ className, children, ...props }: CardTitleProps) => {
  return (
    <h3
      className={cn('font-montserrat text-h3-mobile md:text-h3-desktop text-primary', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = ({
  className,
  children,
  ...props
}: CardDescriptionProps) => {
  return (
    <p
      className={cn('font-opensans text-body-desktop text-gray-600', className)}
      {...props}
    >
      {children}
    </p>
  );
};

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = ({ className, children, ...props }: CardContentProps) => {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
};

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = ({ className, children, ...props }: CardFooterProps) => {
  return (
    <div
      className={cn('mt-4 flex items-center justify-end space-x-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}; 