import type { PortableTextBlock } from '@portabletext/types'

export type FreeformBlockType = {
  _id: string;
  _key: string;
  _type: 'freeformBlock';
  title: string;
  columnsPerRow: '2' | '3' | '4';
  columns: {
    _key: string;
    title: string;
    items: {
      _key: string;
      _type: string;
      headingText?: string;
      headingSize?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
      richTextContent?: PortableTextBlock;
      image: {
        asset: {
          url: string;
        };
        aspectRatio: 'square' | 'rectangle' | 'portrait';
        cornerRadius: 'rounded' | 'straight';
        alt: string;
      };
      buttonText?: string;
      buttonVariant?: 'default' | 'underline';
      buttonType?: 'internal' | 'external' | 'fileDownload';
    }[]
  }[]
}