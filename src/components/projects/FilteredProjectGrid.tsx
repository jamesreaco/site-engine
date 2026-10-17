"use client"

import ProjectGrid from './ProjectGrid';
import { useCategoryFilter } from '@/hooks/useCategoryFilter';
import { AllProjectsQueryResult } from "../../../sanity.types";
import ArchiveEmptyState from '@/components/shared/archive/ArchiveEmptyState';

interface FilteredProjectGridProps {
  projects: AllProjectsQueryResult;
};

export default function FilteredProjectGrid({ projects }: FilteredProjectGridProps) {

  const filteredProjects = useCategoryFilter(projects, '/projects');

  if (filteredProjects.length === 0) return (
    <ArchiveEmptyState>
      No projects found in these categories.
    </ArchiveEmptyState>
  );

  return (
    <ProjectGrid projects={filteredProjects} />
  )
};