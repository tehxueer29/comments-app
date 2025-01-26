import Image, { StaticImageData } from "next/image";

interface ImageButtonProps {
  Icon: StaticImageData;
  text: string;
  className?: string;
  onClick?: () => void;
}

export default function ImageButton({
  Icon,
  text,
  className,
  onClick,
}: ImageButtonProps) {
  return (
    <button className="flex items-center gap-1.5" onClick={onClick}>
      <Image src={Icon} alt={`${text} icon`} />
      <p className={`font-medium text-primary-500 text-sm ${className || ""}`}>
        {text}
      </p>
    </button>
  );
}
