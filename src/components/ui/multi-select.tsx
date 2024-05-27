// https://github.com/shadcn-ui/ui/issues/66
import * as React from "react"
import { cn } from "@/lib/utils"

import { Check, X, ChevronsUpDown } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

export type OptionType = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  placeholder?: string;
  options: OptionType[];
  value: string[];
  onChange: (props: string[]) => void;
  className?: string;
}

function MultiSelect({
  placeholder,
  options,
  value = [],
  onChange,
  className,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: string) => {
    onChange(value.filter((i) => i !== item))
  }

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-controls="listbox"
          aria-expanded={open}
          className={cn(
            buttonVariants({ variant: "outline" }),
            `h-10 w-full justify-between hover:bg-transparent`,
          )}
          onClick={() => setOpen(!open)}
        >
          <div className="flex flex-nowrap gap-1">
            {value.length === 0 && placeholder}
            {value.map((item) => (
              <Badge
                variant="secondary"
                key={item}
                className="mb-1 mr-1"
                onClick={() => handleUnselect(item)}
              >
                {item}
                <button
                  className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="text-muted-foreground hover:text-foreground size-3" />
                </button>
              </Badge>
            ))}
          </div>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className={className}>
          <CommandInput placeholder="Search ..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onChange(
                    value.includes(option.value)
                      ? value.filter((item) => item !== option.value)
                      : [...value, option.value],
                  )
                  setOpen(true)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 size-4",
                    value.includes(option.value)
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { MultiSelect }
