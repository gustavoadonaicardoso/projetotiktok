interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
}

const variantMap = {
  default: "badge-default",
  success: "badge-success",
  warning: "badge-warning",
  error: "badge-error",
  info: "badge-info",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const v = variantMap[variant];
  return (
    <span
      className={`badge ${v}${className ? " " + className : ""}`}
      {...props}
    />
  );
}
