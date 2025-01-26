interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}

export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={`bg-primary-500 text-white px-5 py-2 rounded-lg uppercase font-medium ${
        className || ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
