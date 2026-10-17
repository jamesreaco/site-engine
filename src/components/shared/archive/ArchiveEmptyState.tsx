import { CircleSlash } from 'lucide-react';

export default function ArchiveEmptyState({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className="py-20 flex items-center justify-center gap-2 border border-dashed rounded-3xl text-center text-gray-600 bg-white">
      <CircleSlash
        size={20}
        className='text-red-500'
      />
      <span className='font-medium antialiased'>
        {children}
      </span>
    </div>
  )
};
