import { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { cva, cx } from "class-variance-authority";

const button = cva(['button'], {
  variants: {
    intent: {
      primary: ["w-full", 'gap-4', "justify-center", "border-2", "border-blue-400", "bg-blue-400", "text-white"],
      secondary: ["w-min", 'gap-4',"border-2", "border-blue-400", "text-blue-400"],
      secondaryRed: ["border-2", 'gap-4',"border-red-400", "text-red-400"],
      linear: ["text-neutral-700", "gap-2"],
    },
    size: {
      small: ["p-1", "sm:p-2"],
      medium: ["py-1", "px-2", "sm:py-2", "sm:px-3"],
      none: ["p-0"]
    },
    textStyle: {
      bold: ["font-bold"],
      normal: ["font-normal"]
    },
    disabled: {
      false: null,
      true: ["opacity-60", "cursor-not-allowed"],
    },
  },
  defaultVariants: {
    disabled: false,
    intent: "primary",
    size: "small",
    textStyle: "normal"
  },
})
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
  VariantProps<typeof button> {
    label?: string;
    icon?: ReactNode;
}
export const Button = ({
  label,
  icon,
  intent,
  size,
  textStyle,
  disabled,
  onClick,
  ...props
}: ButtonProps) => {
  return ( 
    <button 
      onClick={onClick}
      className={cx(button({ intent, size, disabled, textStyle }))}
      disabled={disabled || undefined}
      {...props}
      >
      {label && label}
      {icon && icon}
    </button>
  )
}