"use client";

import Header from "@/components/Header";
import styles from "./index.module.scss";
import Container from "@/components/Container";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SecondaryButton from "@/components/Buttons/SecondaryButton";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import strapiRequest from "@/api/strapiRequest";
import Loader from "@/components/Loader";
import { useTranslations } from "next-intl";

const images = ["/main-12.jpg", "/main-2.jpeg", "/main-3.jpg"];

const MainSection = () => {
  const t = useTranslations();
  const [swiper, setSwiper] = useState(null);

  // Предварительная загрузка изображений
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const { data: banner, isLoading: bannerIsLoading } = useQuery({
    queryKey: ["BANNER"],
    queryFn: () => strapiRequest.get("/banner", { params: { populate: "*" } }),
    select: (res) => res.data,
  });

  const bannerImages = useMemo(() => {
    const urls = banner?.photos
      ?.map((photo) => photo?.url)
      ?.filter(Boolean) ?? [];

    return urls.length ? urls : images;
  }, [banner]);

  if (bannerIsLoading) return <Loader />;

  return (
    <div>
      <div className={styles.mainSection}>
        <Swiper
          modules={[Navigation, EffectFade, Autoplay]}
          effect="fade"
          speed={1000}
          navigation={{
            prevEl: ".prevButton",
            nextEl: ".nextButton",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          onSwiper={setSwiper}
          className={styles.carousel}
        >
          {bannerImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className={styles.carouselSlide}
                style={{ backgroundImage: `url(${image})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.overlay}></div>

        <Container>
          <div className={styles.content}>
            <h1 className={styles.title}>{t("main.title")}</h1>
            <p className={styles.subtitle}>{t("main.subtitle")}</p>

            <div className={styles.buttons}>
              <PrimaryButton
                onClick={() =>
                  document
                    .getElementById("about")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                {t("main.learnMore")}
              </PrimaryButton>
              <SecondaryButton
                onClick={() =>
                  document
                    .getElementById("contacts")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                {t("main.contactUs")}
              </SecondaryButton>
            </div>
          </div>
        </Container>

        <div className={styles.sectionFooter}>
          <Container className={styles.container}>
            <div className={`${styles.bannerButton} prevButton`}>
              <FaChevronLeft />
            </div>
            <div className={`${styles.bannerButton} nextButton`}>
              <FaChevronRight />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
