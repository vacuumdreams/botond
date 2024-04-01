import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type MdxAvatarProps = {
  src: string;
  name: string;
  className?: string;
};

export function MdxAvatar({ src, name, className }: MdxAvatarProps) {
  return (
    <Avatar className={cn("size-6", className)}>
      <AvatarImage
        src={src}
        alt={name}
        width={42}
        height={42}
        className="my-0"
      />
      <AvatarFallback>
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  )
}
