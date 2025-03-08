interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}

export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={`bg-primary-500 text-white px-3 py-2 rounded-lg uppercase font-medium sm:px-5 sm:py-2 duration-150 hover:opacity-60 ${
        className || ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
