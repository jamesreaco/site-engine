import { cn } from '@/lib/utils';
import { TypedObject } from '@sanity/types';
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from './PortableTextComponents';

interface PortableTextEditorProps {
  data: TypedObject[] | null;
  classNames?: string;
};

export default function PortableTextEditor({ data, classNames }: PortableTextEditorProps) {
  
  if (!data) return null;

  return (
    <div className={cn(
      'prose prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-sm md:prose-p:text-base',
      classNames
    )}>
      <PortableText 
        value={data}
        components={portableTextComponents} 
      />
    </div>
  )
};