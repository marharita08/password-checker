import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import { cn } from "@/utils/cn";

import { Button } from "./Button";
import { Input } from "./Input";

export interface NumberInputProps {
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  hideButtons?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  min = -Infinity,
  max = Infinity,
  value,
  step = 1,
  onChange,
  label,
  placeholder,
  className,
  disabled,
  hideButtons = false,
}) => {
  const [typedValue, setTypedValue] = useState(String(value ?? ""));
  const [isFocused, setIsFocused] = useState(false);

  const displayValue = isFocused ? typedValue : String(value ?? "");

  const decimals = step.toString().split(".")[1]?.length ?? 0;

  const clamp = (n: number) =>
    parseFloat(Math.min(Math.max(n, min), max).toFixed(decimals));

  const handleMinus = () => {
    const current = value ?? 0;
    if (current > min) onChange(clamp(current - step));
  };

  const handlePlus = () => {
    const current = value ?? 0;
    if (current < max) onChange(clamp(current + step));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (!/^-?\d*[.,]?\d*$/.test(input)) return;

    setTypedValue(input);

    const normalized = input.replace(",", ".");
    if (["-", "-.", "."].some((s) => normalized.endsWith(s))) return;

    const numericValue = parseFloat(normalized);
    if (isNaN(numericValue)) return;

    onChange(numericValue > max ? max : numericValue);
    if (numericValue > max) setTypedValue(String(max));
  };

  const handleFocus = () => {
    setIsFocused(true);
    setTypedValue(String(value ?? ""));
  };

  const handleBlur = () => {
    setIsFocused(false);

    const normalized = typedValue.replace(",", ".");
    let numericValue = parseFloat(normalized);

    if (isNaN(numericValue)) numericValue = min === -Infinity ? 0 : min;

    const clamped = clamp(numericValue);
    if (clamped !== value) onChange(clamped);
  };

  return (
    <div className={cn("relative", className)}>
      <Input
        type="text"
        inputMode="decimal"
        label={label}
        placeholder={placeholder}
        value={displayValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className="pr-8"
        disabled={disabled}
      />
      {!hideButtons && (
        <div className="absolute right-2 top-[3px] flex items-center justify-center flex-col text-muted-foreground">
          <Button
            className="p-0 h-[18px]"
            type="button"
            variant="ghost"
            onClick={handlePlus}
            disabled={disabled}
          >
            <ChevronUp className="w-[18px] h-[18px]" />
          </Button>
          <Button
            className="p-0 h-[18px]"
            type="button"
            variant="ghost"
            onClick={handleMinus}
            disabled={disabled}
          >
            <ChevronDown className="w-[18px] h-[18px]" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default NumberInput;
