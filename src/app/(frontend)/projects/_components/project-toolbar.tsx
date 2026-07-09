import React from 'react';
import { ProjectSearch } from './project-search';
import ProjectCategories from './project-categories';
import { ProjectsPageQueryResult } from '../../../../../sanity.types';

type Project = NonNullable<
  NonNullable<ProjectsPageQueryResult>
>;

interface ProjectToolbarProps {
  categories?: Project["categories"];
  projects?: Project['projects']; 
};

export default function ProjectToolbar({ categories, projects }: ProjectToolbarProps) {
  return (
    <>
      <ProjectSearch projects={projects ?? []} classNames='mt-4 lg:hidden' />
      <div className='relative z-20 overflow-x-scroll lg:overflow-visible -mx-4 lg:-mx-0 py-4 lg:py-2 pl-4 lg:pl-0 mt-6 lg:mt-16 mb-6 lg:mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-2 border-y border-dashed backdrop-blur-md backdrop-opacity-50 pattern-bg--2'>
        <ProjectCategories categories={categories ?? []} />
        <ProjectSearch projects={projects ?? []} classNames='hidden lg:block' />
        <EdgeBlur />
      </div>
    </>
  )
};

function EdgeBlur() {
  return (
    <div className='absolute inset-0 flex items-center justify-between'>
      <div className='relative bg-gradient-to-r from-white to-transparent h-full w-[100px]'></div>
      <div className='bg-gradient-to-l from-white to-transparent h-full w-[100px]'></div>
    </div>
  )
};