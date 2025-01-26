interface CommentLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function CommentLayout({
  children,
  className,
}: CommentLayoutProps) {
  return (
    <div className={`bg-white rounded-lg p-4 ${className || ""}`}>
      {children}
    </div>
  );
}
