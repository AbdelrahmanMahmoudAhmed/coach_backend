import React from "react";
// import ServicesSlider from "@/components/home/ServicesSlider";
import Slider from "@/components/home/Slider";
import FirstSection from "@/components/home/FirstSection";
import AboutUs from "@/components/home/AboutUs";
import WhyUs from "@/components/home/WhyUs";
import Services from "@/components/home/Services";
import OurProjects from "@/components/home/OurProjects";
import Subscribe from "@/components/home/Subscribe";
import Animation from "@/components/home/Animation";

function HomePage() {
  return (
    <div>
      <FirstSection />
      <AboutUs />
      <WhyUs />
      <Services />
      <Animation />
      <OurProjects />
      
      <Slider />
      {/* <ServicesSlider /> */}
      <Subscribe />
    </div>
  );
}

export default HomePage;
