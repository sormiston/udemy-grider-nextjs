import type { StaticImageData } from "next/image";
import Image from "next/image";

interface HeroProps {
  imgData: StaticImageData;
  imgAlt: string;
  title: string;
}

export default function Hero(props: HeroProps) {
  return (
    <div className="relative h-4/5">
      <Image
        src={props.imgData}
        alt={props.imgAlt}
        placeholder="blur"
        fill
        priority
        loading="eager"
        sizes="100vw"
        style={{ objectFit: "cover" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div>
      <div className="absolute inset-0 flex items-center justify-center ">
        <h2 className="text-center text-white text-5xl px-4 -mt-10 font-semibold">
          {props.title}
        </h2>
      </div>
    </div>
  );
}
