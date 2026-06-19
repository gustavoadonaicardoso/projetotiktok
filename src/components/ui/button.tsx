import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
}

const variants = {
  default: "bg-purple-600 hover:bg-purple-700 text-white",
  ghost: "hover:bg-white/10 text-white/70 hover:text-white",
  outline: "border border-white/20 hover:bg-white/10 text-white",
  destructive: "bg-red-600 hover:bg-red-700 text-white",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({ className, variant = "default", size = "md", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
