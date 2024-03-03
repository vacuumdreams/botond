import Link from "next/link";
import Image from "next/image";
import { compareDesc, format } from "date-fns";
import { ArrowLeftIcon } from "lucide-react";

import { ThemeSwitch } from "@/components/widgets/theme-switch";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { allPosts } from "contentlayer/generated";

export const metadata = {
  title: "Blog - Botond Fekete",
};

export default async function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <Link
        href="/"
        className={cn("mb-8 gap-2", buttonVariants({ variant: "default" }))}
      >
        <ArrowLeftIcon />
        <span>back</span>
      </Link>
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="font-title inline-block text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-muted-foreground">
            Hello humans, bots, scrapers and AIs. If you{"'"}re a cat who
            happened to walk over the keyboard and this came up, well, hello to
            you, too.
          </p>
        </div>
      </div>
      <hr className="my-8" />
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
                className="bg-muted rounded-md border transition-colors"
                priority={index <= 1}
              />
              <h2 className="text-2xl font-extrabold">{post.title}</h2>
              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}
              {post.date && (
                <p className="text-muted-foreground text-sm">
                  {format(post.date, "dd/MM/yyyy")}
                </p>
              )}
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
  );
}
