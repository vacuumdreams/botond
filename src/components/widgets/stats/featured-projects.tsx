import { Fragment, useMemo } from "react"
import { formatDistance } from "date-fns"
import Markdown from "react-markdown"
import { PresentationIcon, ClockIcon, ExternalLinkIcon, Layers3Icon, GithubIcon } from 'lucide-react'
import { useData } from "@/components/provider/data"
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn, getDate } from '@/lib/utils'
import { ProcessedData, ProjectItem } from "@/lib/data"
import { Stack } from './work-history/item/stack'

type AttributesProps = {
  url?: string | null
  repoUrl?: string | null
  start?: string
  end?: string | null
}

const Attributes = ({ url, repoUrl, start, end }: AttributesProps) => {
  return (
    <div className="mb-6 w-full items-center">
      <div>
        {url && (
          <a href={url} target="_blank" className="flex items-center gap-2 mb-2">
            <ExternalLinkIcon />
            <span>Website</span>
          </a>
        )}
      </div>
      <div>
        {repoUrl && (
          <a href={repoUrl} target="_blank" className="flex items-center gap-2 mb-2">
            <GithubIcon />
            <span>repository</span>
          </a>
        )}
      </div>
      <p className="flex items-center gap-2 mb-2">
        <ClockIcon />
        <span>Duration: {formatDistance(getDate(start), getDate(end))}</span>
      </p>
    </div>
  )
}

type ProjectItemProps = {
  mode?: "normal" | "print";
  tech: ProcessedData["data"]["skills"]["tech"];
  project: ProjectItem
}

const ProjectItem = ({ mode, tech, project }: ProjectItemProps) => {
  if (mode === "print") {
    return (
      <div>
        <div className="w-full px-4">
          <h4>
            <a className="flex items-center gap-2 mb-2" href={project.url || undefined}>
              <Avatar
                className={cn("flex items-center justify-center", {
                  "border-2": !project.icon,
                })}
              >
                <AvatarImage src={project.icon || ""} alt={project.name} />
                <AvatarFallback>
                  {project.name}
                </AvatarFallback>
              </Avatar>
              <span className="text-base">{project.name}</span>
            </a>
          </h4>
          <div
            className="prose prose-slate my-6 w-full text-xs print:text-black">
            <Markdown>{project.description}</Markdown>
          </div>
          <h4 className="mb-2">Technologies:</h4>
          <Stack
            mode={mode}
            stack={project.stack?.filter((t) => !!tech[t]).map((t) => tech[t]) || []}
          />
        </div>
      </div>
    )
  }

  return (
    <AccordionItem value={project.name}>
      <AccordionTrigger className="p-4">
        <div className="flex w-full items-center justify-between pr-4">
          <h4 className="flex items-center gap-2">
            <Avatar
              className={cn("flex items-center justify-center", {
                "border-2": !project.icon,
              })}
            >
              <AvatarImage src={project.icon || ""} alt={project.name} />
              <AvatarFallback>
                {project.name}
              </AvatarFallback>
            </Avatar>
            <span>{project.name}</span>
          </h4>
          <div className="text-muted-foreground hidden sm:block md:hidden xl:block">
            {project.start}-{project.end || "Present"}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="p-4">
        <Attributes
          url={project.url}
          start={project.start}
          end={project.end}
        />
        <div
          className="prose prose-slate my-6 w-full dark:prose-invert"
        >
          <Markdown>{project.description}</Markdown>
        </div>
        <div className="flex items-center gap-2">
          <Layers3Icon />
          <p>Stack: </p>
          <Stack
            mode={mode}
            stack={project.stack?.filter((t) => !!tech[t]).map((t) => tech[t]) || []}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

type FeaturedProjectsProps = {
  mode?: "normal" | "print";
};

export const FeaturedProjects = ({ mode }: FeaturedProjectsProps) => {
  const { data } = useData()
  const projects = useMemo(() => {
    return Object.values(data.projects).filter(project => project.featured)
  }, [data.projects])

  if (projects.length === 0) {
    return null
  }

  return (
    <div className={cn("pb-4", { 'border-t': mode !== 'print' })}>
      <h3 className="px-4 pb-4 pt-4 mb-0 flex items-center gap-2">
        <PresentationIcon />
        <span className="text-muted-foreground">Featured projects</span>
      </h3>

      <Accordion type="single" collapsible className="w-full">
        {projects.map((project, i) => (
          <Fragment key={project.name}>
            {i > 0 && <Separator />}
            <ProjectItem mode={mode} tech={data.skills.tech} project={project} />
          </Fragment>
        ))}
      </Accordion>
    </div>
  )
}
