interface ContainerLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function ContainerLayout({
  children,
  className,
}: ContainerLayoutProps) {
  return (
    <div className={`bg-white rounded-lg p-4 ${className || ""}`}>
      {children}
    </div>
  );
}
