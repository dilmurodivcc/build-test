
import Header from "@/components/Header";
import MainSection from "./components/MainSection";
import AboutUsSection from "./components/AboutUsSection";
import DirectionsSection from "./components/DirectionsSection";
import ReviewsSection from "./components/ReviewsSection";
import ContactUsSection from "./components/ContactUsSection";
import { useTranslations } from "next-intl";


const Main = () => {
  const t = useTranslations();

  return (
    <div>
      <MainSection />
      <AboutUsSection />
      <DirectionsSection />
      <ReviewsSection />
      <ContactUsSection />
    </div>
  );
};

export default Main;
