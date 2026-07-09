import ProjectCard from './project-card';
import { AllProjectsQueryResult } from '../../../../../sanity.types';

interface ProjectGridProps {
  projects: AllProjectsQueryResult;
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6'>
      {projects?.map((project) => (
        <ProjectCard 
          key={project._id} 
          project={project} 
        />
      ))}
    </div>
  )
};