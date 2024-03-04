import Link from "next/link";
import { ArrowLeftIcon, PawPrint, KeyboardIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-12 flex justify-center gap-4">
          <PawPrint size={64} />
          <KeyboardIcon size={64} />
        </div>
        <h2 className="font-title font-effect-anaglyph mb-4 text-4xl">404</h2>
        <h4 className="font-title font-effect-anaglyph text-xl">not found</h4>
        <p className="my-8">
          Hi, explorer. Your reward for finding this place is this magic button:
        </p>
        <Link
          href="/"
          className={cn("gap-2", buttonVariants({ variant: "default" }))}
        >
          <ArrowLeftIcon />
          <span>home</span>
        </Link>
      </div>
    </div>
  );
}
