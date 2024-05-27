import { Fragment } from "react"
import { formatDistance } from "date-fns"
import Markdown from "react-markdown"
import { PresentationIcon, ClockIcon, ExternalLinkIcon, Layers3Icon, GithubIcon } from 'lucide-react'
import { useData } from "@/components/provider/data"
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn, getDate } from '@/lib/utils'
import { ProcessedData, ProjectItem as Project } from "@/lib/data"
import { Stack } from './work-history/item/stack'

type AttributesProps = {
  url?: string | null
  repoUrl?: string | null
  start?: string
  end?: string | null
}

const Attributes = ({ url, repoUrl, start, end }: AttributesProps) => {
  return (
    <div className="mb-6 w-full items-start justify-between gap-2 sm:flex md:block xl:flex">
      <div>
      <div>
        {url && (
          <a href={url} target="_blank" className="mb-2 flex items-center gap-2">
            <ExternalLinkIcon />
            <span>Website</span>
          </a>
        )}
      </div>
      <div>
        {repoUrl && (
          <a href={repoUrl} target="_blank" className="mb-2 flex items-center gap-2">
            <GithubIcon />
            <span>Repository</span>
          </a>
        )}
      </div>
      </div>
      <div>
      <p className="mb-2 flex items-center gap-2">
        <ClockIcon />
        <span>Duration: {formatDistance(getDate(start), getDate(end))}</span>
      </p>
      </div>
    </div>
  )
}

type ProjectItemProps = {
  mode?: "normal" | "print";
  tech: ProcessedData["data"]["skills"]["tech"];
  project: Project
}

const ProjectItem = ({ mode, tech, project }: ProjectItemProps) => {
  if (mode === "print") {
    return (
      <div>
        <div className="w-full px-4">
          <h4>
            <a className="mb-2 flex items-center gap-2" href={project.url || undefined}>
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
          <h4 className="flex items-center gap-2  text-left">
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
          repoUrl={project.repoUrl}
          start={project.start}
          end={project.end}
        />
        {project?.image && <img src={project.image} />}
        <div
          className="prose prose-slate dark:prose-invert my-6 w-full"
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
  const { data, featuredProjects } = useData()
  const pk = Object.keys(featuredProjects).filter((k) => {
    if (mode === 'print' && !featuredProjects[k].featuredPrint) {
      return false
    }
    return true
  })

  if (pk.length === 0) {
    return null
  }

  return (
    <div className={cn({ 'border-t': mode !== 'print', 'pb-2': mode === 'print' })}>
      <h3 className={cn("bg-muted mb-0 flex items-center gap-2 p-4", {
        'mb-4': mode === 'print',
      })}>
        <PresentationIcon />
        <span className={cn("text-muted-foreground font-title", {
          'text-[0.55rem]': mode === 'print',
          'text-sm': mode !== 'print',
        })}>featured projects</span>
      </h3>

      <Accordion type="single" collapsible className="w-full">
        {pk.map((id, i) => (
          <Fragment key={id}>
            {i > 0 && <Separator />}
            <ProjectItem mode={mode} tech={data.skills.tech} project={featuredProjects[id]} />
          </Fragment>
        ))}
      </Accordion>
    </div>
  )
}
