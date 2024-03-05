import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allAuthors, allPosts } from "contentlayer/generated";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ClockIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Mdx } from "@/components/content/mdx";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ThemeSwitch } from "@/components/widgets/theme-switch";

function calcReadingTime(text: string) {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
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

type PostPageProps = {
  params: {
    slug: string[];
  };
};

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
            <div className="my-4 flex">
              <Badge className="flex gap-2" variant={"secondary"}>
                <ClockIcon className="-ml-2" />
                <span>{calcReadingTime(post.body.raw)} min read</span>
              </Badge>
            </div>
            <div className="flex w-full items-center gap-4">
              {post.date && (
                <time
                  dateTime={post.date}
                  className="text-muted-foreground block text-sm"
                >
                  Published on {format(post.date, "dd/MM/yyyy")}
                </time>
              )}
            </div>
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
        <div className="bg-slate-800 bg-opacity-50 p-8 text-lg">
          <Mdx code={post.body.code} />
        </div>
        <Separator className="mt-12" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link
            href="/blog"
            className={cn("gap-2", buttonVariants({ variant: "default" }))}
          >
            <ArrowLeftIcon />
            <span>See all posts</span>
          </Link>
        </div>
      </div>
      <ThemeSwitch />
    </article>
  );
}
