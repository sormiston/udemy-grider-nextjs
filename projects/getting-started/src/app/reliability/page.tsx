import Hero from "@/components/hero";
import reliabilityImg from "@public/reliability.jpg";

export default function ReliabilityPage() {
  return (
    <Hero
      imgData={reliabilityImg}
      imgAlt="Reliable Systems"
      title="Reliability is our number one priority"
    />
  );
}
