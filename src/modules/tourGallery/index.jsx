"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import Container from "@/components/Container";
import styles from "./index.module.scss";
import strapiRequest from "@/api/strapiRequest";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslations } from "next-intl";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TourGallery = () => {
  const {language} = useLanguage();
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);


  const { data: galleryTypes, isLoading: galleryTypesIsLoading } = useQuery({
    queryKey: ["GALLERY_TYPES", language],
    queryFn: () =>
      strapiRequest.get("/gallery-types", { params: { locale: language } }),
    select: (res) => res.data,
  });

  const { data: gallery, isLoading: galleryIsLoading } = useQuery({
    queryKey: ["GALLERY", language],
    queryFn: () =>
      strapiRequest.get("/galleries", {
        params: { populate: "*", locale: language },
      }),
    select: (res) => res.data,
  });

  const filteredGallery = useMemo(() => {
    if (!gallery) return [];
    return activeCategory === "all" 
      ? gallery 
      : gallery.filter((item) => item.gallery_type?.id === activeCategory);
  }, [gallery, activeCategory]);

  const handlePrevClick = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => 
      prev === 0 ? filteredGallery.length - 1 : prev - 1
    );
  }, [filteredGallery, isTransitioning]);

  const handleNextClick = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => 
      prev === filteredGallery.length - 1 ? 0 : prev + 1
    );
  }, [filteredGallery, isTransitioning]);

  const handleThumbnailClick = useCallback((index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  }, [currentIndex, isTransitioning]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  if (galleryTypesIsLoading || galleryIsLoading) return <Loader />;

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Container className={styles.container}>
          <div className={styles.heroContent}>
            <h1>{t("tourGallery.title")}</h1>
            <p>{t("tourGallery.subtitle")}</p>
          </div>
        </Container>
      </section>

      {/* Gallery Section */}
      <section className={styles.gallerySection}>
        <Container>
          <div className={styles.categoriesFilter}>
            <button
              className={`${styles.categoryButton} ${
                activeCategory === "all" ? styles.active : ""
              }`}
              onClick={() => setActiveCategory("all")}
            >
              {t("tourGallery.allPhotos")}
            </button>
            {galleryTypes?.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryButton} ${
                  category.id === activeCategory ? styles.active : ""
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.title}
              </button>
            ))}
          </div>

          <div className={styles.galleryContainer}>
            {/* Основной слайдер */}
            <div className={styles.mainSlider}>
              <button 
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={handlePrevClick}
                aria-label="Previous image"
              >
                <FaChevronLeft />
              </button>

              <div className={styles.mainImage} onClick={() => setIsLightboxOpen(true)}>
                {filteredGallery.length > 0 && (
                  <img
                    src={filteredGallery[currentIndex]?.photo?.url}
                    alt={filteredGallery[currentIndex]?.title}
                    className={isTransitioning ? styles.transitioning : ''}
                  />
                )}
                <div className={styles.imageInfo}>
                  <h3>{filteredGallery[currentIndex]?.title}</h3>
                  <p>{filteredGallery[currentIndex]?.description}</p>
                </div>
              </div>

              <button 
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={handleNextClick}
                aria-label="Next image"
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Слайдер с миниатюрами */}
            <div className={styles.thumbnailSlider}>
              {filteredGallery.map((item, index) => (
                <div
                  key={item.id}
                  className={`${styles.thumbnail} ${index === currentIndex ? styles.active : ''}`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img
                    src={item?.photo?.formats?.thumbnail?.url || item?.photo?.url}
                    alt={item.title}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Лайтбокс */}
            <Lightbox
              slides={filteredGallery.map((item) => ({
                src: item?.photo?.formats?.large?.url || item?.photo?.url,
                alt: item.title,
                title: item.title,
                description: item.description,
              }))}
              open={isLightboxOpen}
              index={currentIndex}
              close={() => setIsLightboxOpen(false)}
              plugins={[Fullscreen, Slideshow, Zoom]}
            />
          </div>
        </Container>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default TourGallery;
