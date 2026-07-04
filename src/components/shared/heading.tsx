import React from 'react';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const headingVariants = cva(
  'font-semibold antialiased text-gray-900 tracking-tighter leading-normal',
  {
    variants: {
      tag: {
        h1: '', h2: '', h3: '', h4: '', h5: '', h6: '',
      },
      size: {
        xxxl: 'text-3xl md:text-[3.40rem] md:leading-[3.60rem]',
        xxl: 'text-3xl md:text-5xl',
        xl: 'text-2xl md:text-4xl',
        lg: 'text-xl md:text-3xl',
        md: 'text-xl md:text-2xl',
        sm: 'text-xl',
        xs: 'text-lg',
      },
    },
    defaultVariants: {
      tag: 'h1',
      size: 'xl',
    },
  }
);

interface HeadingProps 
  extends React.HTMLAttributes<HTMLHeadingElement>, 
  VariantProps<typeof headingVariants> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
};

const sizeToComponent = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
} as const;

export default function Heading({
  tag = 'h1',
  size = 'xxl',
  as,
  className,
  children,
  ...props
}: HeadingProps) {

  const Component = as || sizeToComponent[tag as keyof typeof sizeToComponent] || 'h1';
  
  return (
    <Component 
      className={cn('', headingVariants({ tag, size, className }))}
      {...props}
    >
      {children}
    </Component>
  )
};