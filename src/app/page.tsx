import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import VirtualTour from "@/components/VirtualTour";
import Location from "@/components/Location";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-black">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Pricing />
        <VirtualTour />
        <Location />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}
