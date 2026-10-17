import Heading from '@/components/shared/Heading';
import ArchiveToolbar, { ArchiveToolbarProps } from './ArchiveToolbar';

interface ArchiveHeaderProps extends ArchiveToolbarProps {
  title?: string | null;
};

export default function ArchiveHeader({ title, ...toolbarProps }: ArchiveHeaderProps) {
  return (
    <>
      <Heading tag="h1" size="xxl" className='w-fit'>
        {title}
      </Heading>
      <ArchiveToolbar {...toolbarProps} />
    </>
  )
};
