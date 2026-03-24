import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

const labelVariants = cva(
  "text-foreground text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>;

function Label({ className, ref, ...props }: LabelProps) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
  );
}

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
