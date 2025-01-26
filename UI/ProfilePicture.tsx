import Image, { StaticImageData } from "next/image";


interface ProfilePictureProps {
  url: StaticImageData | string;
}

export default function ProfilePicture({ url }: ProfilePictureProps) {
  return <Image src={url} alt="Profile picture" className="size-8" />;
}
