import Image, { StaticImageData } from "next/image";

interface ProfilePictureProps {
  url?: StaticImageData | string | null;
  className?: string;
}

export default function ProfilePicture({
  url,
  className,
}: ProfilePictureProps) {
  return (
    <Image
      src={url || "/images/avatars/default.svg"}
      alt="Profile picture"
      className={`size-8 rounded-full w-auto ${className || ""}`}
      width={32}
      height={32}
    />
  );
}
