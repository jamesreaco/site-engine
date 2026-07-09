import { cn } from '@/lib/utils';
import { ButtonType } from '@/types';
import { Button } from '../ui/Button';
import { stegaClean } from 'next-sanity';

export default function ButtonRenderer({ buttons, classNames }: {
  buttons: ButtonType[];
  classNames?: string;
}) {

  if (!buttons?.length) return null;

  return (
    <div className={cn('flex items-center gap-3 list-none', classNames)}>
      {buttons.map((button) => (
        <Button
          key={`button-${button?._key}`}
          variant={stegaClean(button?.buttonVariant) ?? 'primary'} 
          buttonType={stegaClean(button?.buttonType) ?? 'external'}
          width={stegaClean(button?.buttonWidth) ?? 'auto'}
          pageReference={stegaClean(button?.buttonPageReference) ?? null}
          externalUrl={stegaClean(button?.buttonExternalUrl) ?? ''}
          emailAddress={stegaClean(button?.buttonEmailAddress) ?? ''}
          fileUrl={stegaClean(button?.buttonFileUrl)?.asset?.url}
          anchorLocation={stegaClean(button?.buttonAnchorLocation) ?? 'currentPage'}
          anchorId={stegaClean(button?.buttonAnchorId) ?? ''}
          className={cn('w-auto', { 
            'w-full': stegaClean(button?.buttonWidth) === 'fullWidth' 
          })}
        >
          {button?.buttonText}
        </Button>
      ))}
    </div>
  )
};