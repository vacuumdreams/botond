import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  return (
    <main className="container pt-24">
      <Link
        href="/"
        className={cn("gap-2", buttonVariants({ variant: "default" }))}
      >
        <ArrowLeftIcon />
        <span>back</span>
      </Link>
      <h1 className="font-title mb-24 mt-8 text-8xl uppercase">Blog</h1>

      <div>
        <p>Not yet :(</p>
      </div>
    </main>
  );
}
