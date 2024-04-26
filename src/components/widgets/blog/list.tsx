"use client"

import { useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { compareDesc, compareAsc, format } from "date-fns"
import { ArrowLeftIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { ThemeSwitch } from "@/components/widgets/theme-switch"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { allPosts, Post } from "contentlayer/generated"
import { BlogFilters, Sort, Filters, FilterOptions } from './filter'

const getFilterOptions = (posts: Post[]): FilterOptions => {
  return posts.reduce<FilterOptions>((acc, post) => {
    post.tags?.split(', ').forEach((tag) => {
      if (!acc.tags.includes(tag)) {
        acc.tags.push(tag)
      }
    })
    return acc
  }, {
    tags: []
  })
}

const processFilters = (filters: Filters, post: Post) => {
  return post.published
    && (filters.tags.length === 0 || filters.tags.some(tag => post.tags.includes(tag)))
}

const processSort = (sort: Sort, p1: Post, p2: Post) => {
  if (sort.type === 'ASC') {
    return compareAsc(new Date(p1.date), new Date(p2.date))
  }
  return compareDesc(new Date(p1.date), new Date(p2.date))
}

export function BlogList() {
  const filterOptions = getFilterOptions(allPosts)
  const [filters, setFilters] = useState<Filters>({ tags: [] })
  const [sort, setSort] = useState<Sort>({ type: 'DESC' })
  const posts = allPosts
    .filter((post) => processFilters(filters, post))
    .sort((p1, p2) => processSort(sort, p1, p2))

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <Link
        href="/"
        className={cn("mb-8 gap-2", buttonVariants({ variant: "default" }))}
      >
        <ArrowLeftIcon />
        <span>back</span>
      </Link>
      <div className="flex flex-col items-start gap-4 mb-8 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="font-title font-effect-anaglyph inline-block text-xl tracking-tight sm:text-4xl lg:text-5xl">
            Blog
          </h1>
          <p className="text-muted-foreground">
            Hello humans, bots, scrapers and AIs. If you{"'"}re a cat who
            happened to walk over the keyboard and this came up on display, well, hello to
            you, too.
          </p>
        </div>
      </div>
      <div>
        {/* <BlogFilters
          filters={filters}
          options={filterOptions}
          sort={sort}
          setFilters={setFilters}
          setSort={setSort}
        /> */}
        {/* <hr className="my-8" /> */}
        {posts?.length ? (
          <div className="grid gap-10 sm:grid-cols-2">
            {posts.map((post, index) => (
              <article
                key={post._id}
                className="group relative flex flex-col space-y-2"
              >
                <Image
                  src={post.image || "/images/blog/default.png"}
                  alt={post.title}
                  width={804}
                  height={452}
                  className="bg-muted aspect-video rounded-md border object-cover object-center transition-colors"
                  priority={index <= 1}
                />
                <h2 className="text-2xl font-extrabold">{post.title}</h2>
                {post.description && (
                  <p className="text-muted-foreground">{post.description}</p>
                )}
                <div className="flex justify-between gap-2">
                  {post.date && (
                    <p className="text-muted-foreground text-sm">
                      {format(post.date, "dd/MM/yyyy")}
                    </p>
                  )}
                  {post.tags.split(',').map(tag => (
                    <Badge key={tag} className="ml-2">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link href={post.slug} className="absolute inset-0">
                  <span className="sr-only">View Article</span>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p>No posts published.</p>
        )}
        <ThemeSwitch />
      </div>
    </div>
  )
}
