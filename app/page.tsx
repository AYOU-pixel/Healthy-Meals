import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import JuiceSection from "./components/JuiceSection";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import FindUs from "./components/FindUs";
import Gallery from "./components/Gallery";

const breakfastItems = [
  { name: "Oatmeal Bowl",       image: "/3.jpg",  price: "27dh" },
  { name: "Egg Toast",          image: "/8.jpg",  price: "12dh" },
  { name: "Kiwi Banana waffle", image: "/15.jpg", price: "25dh" },
  { name: "Avocado Toast",      image: "/1.jpg",  price: "18dh" },
  { name: "Moroccan breakfast", image: "/10.jpg", price: "30dh" },
];

const lunchItems = [
  { name: "Beef bowl",            image: "/2.jpg",  price: "45dh" },
  { name: "Chicken Wrap",         image: "/11.jpg", price: "35dh" },
  { name: "Veggie Pizza",         image: "/16.jpg", price: "40dh" },
  { name: "Chicken Bowl",         image: "/9.jpg",  price: "40dh" },
  { name: "Moroccan tajine lite", image: "/13.jpg", price: "50dh" },
  { name: "Fit burge", image: "/k1.jpg", price: "35dh" }
];

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white">
      <Navbar />
      <Hero />
      <MenuHeading />

      <div id="menu">
        <MenuSection title="Breakfast" items={breakfastItems} />
      </div>
      <MenuSection title="Lunch" items={lunchItems} />
      <JuiceSection />

      <Testimonials />
      <FindUs />
      <Gallery />
      <Footer />
    </main>
  );
}

function MenuHeading() {
  return (
    <div className="text-center py-12 px-4">
      <p className="text-[#4a7c3f] text-xs font-semibold uppercase tracking-[0.2em] mb-2">
        What we offer
      </p>
      <h2 className="text-3xl sm:text-4xl font-semibold text-[#4a7c3f]">
        Menu Suggested
      </h2>
      <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto leading-relaxed">
        Where quality meets creativity. Dive into a menu full of color, balance, and irresistible taste.
      </p>
      <div className="mt-5 flex justify-center">
        <span className="block w-10 h-[3px] rounded-full bg-[#4a7c3f] opacity-60" />
      </div>
    </div>
  );
}
