import Hero from "@/components/hero";
import scaleImg from "@public/scale.jpg";

export default function ScalePage() {
  return (
    <Hero
      imgData={scaleImg}
      imgAlt="Scalable Solutions"
      title="Scale to Infinity"
    />
  );
}
