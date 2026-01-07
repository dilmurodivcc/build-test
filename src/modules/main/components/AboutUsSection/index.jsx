"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/Container";
import styles from "./index.module.scss";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import SectionTitle from "@/components/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import strapiRequest from "@/api/strapiRequest";
import getImageFormat from "@/utils/getImageFormat";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslations } from "next-intl";

const AboutUsSection = () => {
  const sectionRef = useRef(null);
  const router = useRouter();
  const {language} = useLanguage();
  const t = useTranslations();
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         entry.target.classList.add(styles.visible);
  //       }
  //     },
  //     { threshold: 0.3 }
  //   );

  //   if (sectionRef.current) {
  //     observer.observe(sectionRef.current);
  //   }

  //   return () => observer.disconnect();
  // }, []);


  const { data: aboutCompany, isLoading: aboutCompanyIsLoading } = useQuery({
    queryKey: ['ABOUT_US', language],
    queryFn: () => strapiRequest.get('/about-company', { params: { populate: '*', locale: language } }),
    select: res => res.data
  })

  if(aboutCompanyIsLoading) return <Loader />

  return (
    <div id="about" className={styles.section} ref={sectionRef}>
      <Container className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.imageBlock}>
            <img src={getImageFormat(aboutCompany?.photos?.[0], 'medium')} alt="Путешествие с Tasnim Travel" className={styles.image1} loading="lazy" />
            <img src={getImageFormat(aboutCompany?.photos?.[1], 'medium')} alt="Незабываемые моменты" className={styles.image2} loading="lazy" />
            <img src={getImageFormat(aboutCompany?.photos?.[2], 'medium')} alt="Уникальные места" className={styles.image5} loading="lazy" />
          </div>
        </div>
        <div className={styles.rightSide}>
          <SectionTitle className={styles.title}>{aboutCompany?.title}</SectionTitle>
          <p className={styles.description}>
            {aboutCompany?.text}
          </p>
          <div className={styles.buttonBlock}>
            <PrimaryButton className={styles.button} onClick={() => router.push('/about-us')}>{t("main.readMore")}</PrimaryButton>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutUsSection;
