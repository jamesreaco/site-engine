import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const containerVariants = cva(
  'h-full mx-auto',
  {
    variants: {
      variant: {
        contained:
          'max-w-8xl px-6 md:px-10',
        fullWidth:
          'max-w-full',
      },
    },
    defaultVariants: {
      variant: 'contained',
    },
  }
);

interface ContainerProps 
  extends React.HTMLAttributes<HTMLDivElement>, 
  VariantProps<typeof containerVariants>{
    paddingTop?: string,
    paddingBottom?: string,
  };

export default function Container(props: ContainerProps) {

  const { 
    variant, 
    className, 
    paddingTop, 
    paddingBottom, 
    children 
  } = props;

  const paddingTopStyles = {
    'pt-0': paddingTop === 'none', 
    'pt-7': paddingTop === 'small',
    'pt-14 md:pt-16': paddingTop === 'medium',
    'pt-16 md:pt-28': paddingTop === 'default', 
    'pt-16 lg:pt-36': paddingTop === 'large', 
  };

  const paddingBottomStyles = {
    'pb-0': paddingBottom === 'none', 
    'pb-7': paddingBottom === 'small', 
    'pb-14 md:pb-16': paddingTop === 'medium',
    'pb-16 md:pb-28': paddingBottom === 'default', 
    'pb-16 lg:pb-36': paddingBottom === 'large'
  };
 
  return (
    <div className={cn(
      paddingTopStyles, 
      paddingBottomStyles, 
      containerVariants({ variant, className })
    )}>
      {children}
    </div>
  )
};