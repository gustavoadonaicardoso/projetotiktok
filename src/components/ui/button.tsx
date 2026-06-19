interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
}

const variantMap = {
  default: "btn-primary",
  ghost: "btn-ghost",
  outline: "btn-outline",
  destructive: "btn-primary",
};

const sizeMap = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

export function Button({ className, variant = "default", size = "md", ...props }: ButtonProps) {
  const v = variantMap[variant];
  const s = sizeMap[size];
  return (
    <button
      className={`btn ${v}${s ? " " + s : ""}${className ? " " + className : ""}`}
      {...props}
    />
  );
}
