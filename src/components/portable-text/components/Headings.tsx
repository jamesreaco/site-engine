"use client"

import { Link } from 'lucide-react';
import Heading from "@/components/shared/Heading";
import { copyToClipboard, slugify } from "@/lib/utils";
import { PortableTextBlock } from '@portabletext/types';
import { PortableTextBlockComponent } from 'next-sanity';
import { PortableTextComponentProps } from '@portabletext/react';

export const portableTextHeadings: Record<string, PortableTextBlockComponent> = {
  h2: (props: PortableTextComponentProps<PortableTextBlock>) => {
    const text = props.value.children?.[0]?.text ?? '';
    const id = slugify(text);
    return (
      <Heading 
        id={id} size="xl" tag="h2" 
        onClick={() => copyToClipboard(id)}
        className='flex items-center gap-3 group cursor-pointer'
      >
        {text}
        <LinkIcon />
      </Heading>
    );
  },
  h3: (props: PortableTextComponentProps<PortableTextBlock>) => {
    const text = props.value.children?.[0]?.text ?? '';
    const id = slugify(text);
    return (
      <Heading 
        id={id} size="lg" tag="h3" 
        onClick={() => copyToClipboard(id)}
        className='mt-12 flex items-center gap-3 group cursor-pointer'  
      >
        {text}
        <LinkIcon />
      </Heading>
    );
  },
  h4: (props: PortableTextComponentProps<PortableTextBlock>) => {
    const text = props.value.children?.[0]?.text ?? '';
    const id = slugify(text);
    return (
      <Heading 
        id={id} size="md" tag="h4" 
        onClick={() => copyToClipboard(id)}
        className='mt-12 flex items-center gap-3 group cursor-pointer'  
      >
        {text}
        <LinkIcon />
      </Heading>
    );
  },
  h5: (props: PortableTextComponentProps<PortableTextBlock>) => {
    const text = props.value.children?.[0]?.text ?? '';
    const id = slugify(text);
    return (
      <Heading 
        id={id} size="sm" tag="h5" 
        onClick={() => copyToClipboard(id)}
        className='mt-12 flex items-center gap-3 group cursor-pointer'  
      >
        {text}
        <LinkIcon />
      </Heading>
    );
  },
  h6: (props: PortableTextComponentProps<PortableTextBlock>) => {
    const text = props.value.children?.[0]?.text ?? '';
    const id = slugify(text);
    return (
      <Heading 
        id={id} size="xs" tag="h6" 
        onClick={() => copyToClipboard(id)}
        className='mt-12 flex items-center gap-3 group cursor-pointer'  
      >
        {text}
        <LinkIcon />
      </Heading>
    );
  },
};

function LinkIcon() {
  return (
    <Link 
      size={18} 
      className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-500'
    />
  )
};