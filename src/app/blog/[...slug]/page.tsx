import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allAuthors, allPosts } from "contentlayer/generated";
import { format } from "date-fns";
import Markdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ThemeSwitch } from "@/components/widgets/theme-switch";
import { Background } from "@/components/widgets/background";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(paramSlugs?: string[]) {
  const slug = paramSlugs?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    authors: post.authors.map((author) => ({
      name: author,
    })),
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params.slug);

  if (!post) {
    notFound();
  }

  const authors = post.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`),
  );

  return (
    <article className="relative py-6 lg:py-10">
      <Background />
      <div>
        <div className="container max-w-3xl">
          <Link
            href="/blog"
            className={cn("mb-8 gap-2", buttonVariants({ variant: "default" }))}
          >
            <ArrowLeftIcon />
            back
          </Link>
        </div>
        <div className="relative py-8">
          <div className="container max-w-3xl">
            {post.date && (
              <time
                dateTime={post.date}
                className="text-muted-foreground block text-sm"
              >
                Published on {format(post.date, "dd/MM/yyyy")}
              </time>
            )}
            <h1 className="font-title font-effect-anaglyph mt-2 inline-block text-4xl leading-tight lg:text-2xl">
              {post.title}
            </h1>
            {authors?.length ? (
              <div className="mt-4 flex space-x-4">
                {authors.map((author) =>
                  author ? (
                    <div key={author._id} className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={author.avatar}
                          alt={author.title}
                          width={42}
                          height={42}
                        />
                        <AvatarFallback>
                          {author.title
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground">
                        {author.title}
                      </span>
                    </div>
                  ) : null,
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="container max-w-3xl">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={720}
            height={405}
            className="bg-muted my-8 rounded-md border transition-colors"
            priority
          />
        )}
        <div className="prose prose-slate dark:prose-invert my-6 w-full">
          <Markdown>{post.body.raw}</Markdown>
        </div>
        <Separator className="mt-12" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            See all posts
          </Link>
        </div>
      </div>
      <ThemeSwitch />
    </article>
  );
}
