"use client";

import Container from "@/components/Container";
import styles from "./index.module.scss";
import SectionTitle from "@/components/SectionTitle";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import strapiRequest from "@/api/strapiRequest";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const DirectionsSection = () => {
  const {language} = useLanguage();
  const t = useTranslations();
  const { data: directions, isLoading: directionsIsLoading } = useQuery({
    queryKey: ["DIRECTIONS", language],
    queryFn: () =>
      strapiRequest.get("/directions", {
        params: { populate: "*", locale: language },
      }),
    select: (res) => res.data,
  });


  if (directionsIsLoading)
    return (
      <div id="directions">
        <Loader />
      </div>
    );

  return (
    <div className={styles.section} id="directions">
      <Container className={styles.container}>
        <SectionTitle className={styles.title}>{t("main.directions")}</SectionTitle>
      </Container>

      <div className={styles.sliderContainer}>
        <Swiper
          className={styles.slider}
          modules={[Navigation, Autoplay, Mousewheel]}
          navigation={true}
          autoplay={{
            delay: 800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: false,
          }}
          spaceBetween={24}
          grabCursor={true}
          breakpoints={{
            320: { 
              slidesPerView: 1.1, 
              spaceBetween: 16,
            },
            640: { 
              slidesPerView: 1.5, 
              spaceBetween: 16,
            },
            768: { 
              slidesPerView: 2, 
              spaceBetween: 20,
            },
            1024: { 
              slidesPerView: 3, 
              spaceBetween: 24,
            },
          }}
        >
            {directions?.map((direction) => (
              <SwiperSlide key={direction?.id}>
                <Link className={styles.card} href={`/directions/${direction?.documentId}`}>
                  <img
                    src={direction.photo?.formats?.medium?.url || direction.photo?.url}
                    alt={direction.title}
                    className={styles.image}
                    loading="lazy"
                  />
                  <div className={styles.content}>
                    <div className={styles.title}>{direction.title}</div>
                    <div className={styles.description}>
                      <BlocksRenderer content={direction.text ?? []} />
                    </div>
                    <PrimaryButton className={styles.button}>
                      {t("main.more")}
                    </PrimaryButton>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DirectionsSection;
