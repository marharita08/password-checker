"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils";

import { Label } from "./";

const inputVariants = cva(
  "text-foreground flex w-full peer rounded-lg bg-card px-3 py-2 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-600 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-offset-0",
  {
    variants: {
      variant: {
        default: "border border-primary-900 focus-visible:border-primary",
        success: "border border-success",
        error: "border border-error",
      },
      size: {
        sm: "h-8 px-2 py-1 text-xs",
        md: "h-11 px-3 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  ref?: React.Ref<HTMLInputElement>;
  error?: boolean;
  startIcon?: React.ReactNode;
  onClear?: () => void;
  label?: string;
  labelClassName?: string;
}

function Input({
  className,
  type = "text",
  variant,
  size,
  error,
  startIcon,
  onClear,
  value,
  disabled,
  readOnly,
  placeholder,
  label,
  ref,
  ...props
}: InputProps) {
  const actualVariant = error ? "error" : (variant ?? "default");
  const showClearIcon = onClear && value && !disabled && !readOnly;

  const id = React.useId();
  const internalRef = React.useRef<HTMLInputElement>(null);

  const mergedRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      internalRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.RefObject<HTMLInputElement | null>).current = node;
      }
    },
    [ref],
  );

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (props.onClick) {
      const syntheticEvent = {
        ...e,
        currentTarget: internalRef.current,
        target: internalRef.current,
      } as React.MouseEvent<HTMLInputElement>;
      props.onClick(syntheticEvent);
    }

    if (internalRef.current && !disabled && !readOnly) {
      internalRef.current.focus();
    }
  };

  const labelElement = label ? <Label htmlFor={id}>{label}</Label> : null;

  const inputElement = (
    <input
      {...props}
      id={id}
      type={type}
      className={cn(
        inputVariants({ variant: actualVariant, size }),
        startIcon && "pl-10",
        showClearIcon && "pr-9",
        className,
      )}
      ref={mergedRef}
      value={value}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      aria-invalid={error}
    />
  );

  if (startIcon || showClearIcon) {
    return (
      <div className="flex flex-col gap-1">
        {labelElement}
        <div
          className={cn(
            "focus-within:text-primary text-primary-900 relative flex w-full items-center",
            actualVariant === "error" && "text-error focus-within:text-error",
          )}
          onClick={handleWrapperClick}
        >
          {startIcon && (
            <div
              className={cn(
                "absolute left-3 z-10 flex cursor-pointer items-center",
                disabled && "cursor-not-allowed opacity-50",
              )}
            >
              {startIcon}
            </div>
          )}
          {inputElement}
          {showClearIcon && (
            <div className="absolute right-3 z-10 flex items-center gap-1">
              <button
                type="button"
                onClick={onClear}
                aria-label="Clear input"
                className="text-muted-foreground flex h-5 w-5 cursor-pointer items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {labelElement}
      {inputElement}
    </div>
  );
}

Input.displayName = "Input";

export { Input };
