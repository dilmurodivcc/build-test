"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/Container";
import styles from "./index.module.scss";
import strapiRequest from "@/api/strapiRequest";
import Loader from "@/components/Loader";
import { useParams, useRouter } from "next/navigation";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslations } from "next-intl";

const TourDetail = () => {
  const {language} = useLanguage();
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const [currentImage, setCurrentImage] = useState(-1);

  const { data: tour, isLoading } = useQuery({
    queryKey: ["TOUR", params?.id, language],
    queryFn: () =>
      strapiRequest.get(`/tours/${params?.id}`, {
        params: { populate: "*", locale: language },
      }),
    select: (res) => res.data,
  });

  if (isLoading) return <Loader />;

  const photos = tour?.photos?.map((photo) => ({
    src: photo?.formats?.large?.url,
    width: photo?.formats?.large?.width,
    height: photo?.formats?.large?.height,
    alt: tour.title,
  }));

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground} style={{ backgroundImage: `url(${tour?.preview_photo?.formats?.large?.url})` }} />
        <Container>
          <div className={styles.heroContent}>
            <div className={styles.breadcrumbs}>
              <span onClick={() => router.push('/')} className={styles.breadcrumbLink}>
                {t("header.home")}
              </span>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span onClick={() => router.push('/#tours')} className={styles.breadcrumbLink}>
                {t("header.tours")}
              </span>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbCurrent}>{tour?.title}</span>
            </div>
            <h1>{tour?.title}</h1>
            <div className={styles.tourInfo}>
              <div className={styles.infoItem}>
                <span className={styles.label}>{t("tours.detail.duration")}:</span>
                <span className={styles.value}>{tour?.days} дней</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>{t("tours.detail.price")}:</span>
                <span className={styles.value}>от ${tour?.price}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>{t("tours.detail.tourType")}:</span>
                <span className={styles.value}>{tour?.tour_type?.title}</span>
              </div>
            </div>
            <div className={styles.tags}>
              {tour?.tags?.map((tag) => (
                <span key={tag.id} className={styles.tag}>
                  {tag.title}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Description Section */}
      <section className={styles.description}>
        <Container>
          <div className={styles.content}>
            <div className={styles.sectionHeader}>
              <h2>{t("tours.detail.title")}</h2>
              <div className={styles.decorativeLine}>
                <span className={styles.line}></span>
                <span className={styles.dot}></span>
                <span className={styles.line}></span>
              </div>
            </div>
            <div className={styles.text}>
              <BlocksRenderer content={tour?.text ?? []} />
            </div>
          </div>
        </Container>
      </section>

      {/* Gallery Section */}
      {photos?.length > 0 && (
        <section className={styles.gallery}>
          <Container>
            <div className={styles.sectionHeader}>
              <h2>{t("tours.detail.gallery")}</h2>
              <div className={styles.decorativeLine}>
                <span className={styles.line}></span>
                <span className={styles.dot}></span>
                <span className={styles.line}></span>
              </div>
            </div>
            <div className={styles.galleryContainer}>
              <div className={styles.photoGrid}>
                {photos?.map((photo, index) => (
                  <div key={index} className={styles.photoItem} onClick={() => setCurrentImage(index)}>
                    <img src={photo.src} alt={photo.alt} />
                  </div>
                ))}
              </div>

              <Lightbox
                slides={photos}
                open={currentImage >= 0}
                index={currentImage}
                close={() => setCurrentImage(-1)}
                plugins={[Fullscreen, Slideshow, Zoom]}
              />
            </div>
          </Container>
        </section>
      )}
    </div>
  );
};

export default TourDetail;
