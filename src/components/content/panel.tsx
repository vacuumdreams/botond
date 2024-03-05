import { cn } from "@/lib/utils";

type MdxPanelProps = {
  icon?: string;
  children?: React.ReactNode;
  className?: string;
  type?: "default" | "warning" | "danger";
};

export function MdxPanel({
  children,
  type = "default",
  className,
  ...props
}: MdxPanelProps) {
  return (
    <div
      className={cn(
        "my-6 flex items-start rounded-md border border-l-4 p-4",
        {
          "border-red-900 bg-red-50": type === "danger",
          "border-yellow-900 bg-yellow-50": type === "warning",
        },
        className,
      )}
      {...props}
    >
      <div>{children}</div>
    </div>
  );
}
