interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, style, ...props }: CardProps) {
  return <div className={`card${className ? " " + className : ""}`} style={style} {...props} />;
}

export function CardHeader({ className, ...props }: CardProps) {
  return <div className={`card-header${className ? " " + className : ""}`} {...props} />;
}

export function CardTitle({ className, ...props }: CardProps) {
  return <h3 className={`card-title${className ? " " + className : ""}`} {...props} />;
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={className} {...props} />;
}
