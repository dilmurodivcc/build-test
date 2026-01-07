
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/Container";
import styles from "./index.module.scss";
import strapiRequest from "@/api/strapiRequest";
import Loader from "@/components/Loader";
import { useParams, useRouter } from "next/navigation";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslations } from "next-intl";

const DirectionDetail = () => {
  const {language} = useLanguage();
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();

  const { data: direction, isLoading } = useQuery({
    queryKey: ["DIRECTION", params?.id, language],
    queryFn: () =>
      strapiRequest.get(`/directions/${params?.id}`, {
        params: { populate: "*", locale: language },
      }),
    select: (res) => res.data,
  });

  console.log("direction -->", direction);

  if (isLoading) return <Loader />;

  // Преобразуем rich text в HTML
  // const descriptionHtml = direction?.text?.map(block => {
  //   if (block.type === 'paragraph') {
  //     return '<p>' + block.children.map(child => {
  //       const text = child.text;
  //       return child.bold ? `<strong>${text}</strong>` : text;
  //     }).join('') + '</p>';
  //   }
  //   return '';
  // }).join('');

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground} style={{ backgroundImage: `url(${direction?.photo?.formats?.large?.url})` }} />
        <Container className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.breadcrumbs}>
              <span onClick={() => router.push('/')} className={styles.breadcrumbLink}>
                {t("header.home")}
              </span>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span onClick={() => router.push('/#directions')} className={styles.breadcrumbLink}>
                {t("header.directions")}
              </span>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbCurrent}>{direction?.title}</span>
            </div>
            <h1>{direction?.title}</h1>
          </div>
        </Container>
      </section>

      {/* Overview Section */}
      <section className={styles.overview}>
        <Container>
          <div className={styles.content}>
            <div className={styles.sectionHeader}>
              <h2>{t("directions.detail.title")}</h2>
              <div className={styles.decorativeLine}>
                <span className={styles.line}></span>
                <span className={styles.dot}></span>
                <span className={styles.line}></span>
              </div>
            </div>
            <div className={styles.description} >
              <BlocksRenderer content={direction?.text ?? []} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default DirectionDetail;