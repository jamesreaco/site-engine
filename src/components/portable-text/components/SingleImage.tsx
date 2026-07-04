import Image from "next/image";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/utils";

export default function SingleImage({ data }: {
  data: {
    image?: {
      asset: {
        _ref: string;
      };
      aspectRatio: 'square' | 'rectangle' | 'portrait';
      cornerRadius: 'rounded' | 'straight';
      enableBorder: boolean;
      borderStyle: 'solid' | 'dashed';
      alt: string;
    };
  }
}) {
  return (
    <div>
      {data.image?.asset._ref && (
        <div className='mt-12 md:mt-14 p-4 md:p-4 border border-dashed rounded-3xl'>
          <Image
            src={
              urlForImage(data.image)
              ?.height(400)
              .width(800)
              .url() as string
            }
            width={800}
            height={800}
            alt={data.image?.alt ?? ''}
            className={cn('h-auto w-full my-0 object-cover aspect-auto rounded-2xl', {
              'aspect-[3/2]': data?.image?.aspectRatio === 'rectangle',
              'aspect-[3/4]': data?.image?.aspectRatio === 'portrait',
            })}
          />
        </div>
      )}
    </div>
  )
};