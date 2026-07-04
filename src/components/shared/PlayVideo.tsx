import React from 'react';
import VideoDialog from './VideoDialog';

export default function PlayVideo({ videoUrl }: {
  videoUrl: string;
}) {
  return (
    <div className='z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group'>
      <VideoDialog videoUrl={videoUrl}>
        <button aria-label='Play video' className='flex flex-col justify-center items-center outline-none'>
          <div className='flex items-center justify-center h-14 w-14 lg:h-20 lg:w-20 border-[2.5px] drop-shadow-xl group border-white rounded-full bg-white/20 backdrop-blur-lg transition duration-300'>
            <div className='h-6 w-6 play-icon translate-x-1 bg-white'></div>
          </div>
          <div className='hidden md:block translate-y-10 group-hover:translate-y-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out'>
            <span className='font-medium text-lg text-white'>
              Play Video
            </span>
          </div>
        </button>
      </VideoDialog>
      <div className='w-full h-0.5 rounded-full translate-y-5 translate-x-20 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out bg-white' />
    </div>
  )
};