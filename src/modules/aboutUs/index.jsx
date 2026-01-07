"use client"

import Container from "@/components/Container";
import styles from "./index.module.scss";
import SectionTitle from "@/components/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import strapiRequest from "@/api/strapiRequest";
import Loader from "@/components/Loader";
import getImageFormat from "@/utils/getImageFormat";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslations } from "next-intl";

const AboutUs = () => {
  const {language} = useLanguage();
  const t = useTranslations();

  const stats = [
    { number: "1000+", text: t("aboutUs.stats.clients") },
    { number: "50+", text: t("aboutUs.stats.directions") },
    { number: "5", text: t("aboutUs.stats.experience") },
    { number: "24/7", text: t("aboutUs.stats.support") },
  ];

  const values = [
    {
      icon: "/globe.svg",
      title: t("aboutUs.values.global"),
      description: t("aboutUs.values.globalDescription")
    },
    {
      icon: "/window.svg",
      title: t("aboutUs.values.comfort"),
      description: t("aboutUs.values.comfortDescription")
    },
    {
      icon: "/file.svg",
      title: t("aboutUs.values.reliability"),
      description: t("aboutUs.values.reliabilityDescription")
    }
  ];

  const { data: aboutUs, isLoading: aboutUsIsLoading } = useQuery({
    queryKey: ['ABOUT_US', language],
    queryFn: () => strapiRequest.get('/about-us', { params: { populate: '*', locale: language } }),
    select: res => res.data
  })

  const { data: team, isLoading: teamIsLoading } = useQuery({
    queryKey: ['TEAM', language],
    queryFn: () => strapiRequest.get('/teams', { params: { populate: '*', locale: language } }),
    select: res => res.data
  })

  if(teamIsLoading || aboutUsIsLoading) return <Loader />

  return (
    <div>      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Container className={styles.container}>
          <div className={styles.heroContent}>
            <h1>{t("aboutUs.title")}</h1>
            <p>{t("aboutUs.subtitle")}</p>
          </div>
        </Container>
      </section>

      {/* Кто мы? */}
      <section className={styles.whoWeAreSection}>
        <Container className={styles.container}>
          <div className={styles.content}>
            <div className={styles.textContent}>
              <SectionTitle>{aboutUs?.title}</SectionTitle>
              <div className={styles.description}>
                {aboutUs?.text}
              </div>
            </div>
            <div className={styles.imageGrid}>
              <div className={`${styles.imageWrapper} ${styles.image1}`}>
                <img src={getImageFormat(aboutUs?.photos?.[0], 'medium')} alt="Tasnim Travel" />
              </div>
              <div className={`${styles.imageWrapper} ${styles.image2}`}>
                <img src={getImageFormat(aboutUs?.photos?.[1], 'medium')} alt="Tasnim Travel" />
              </div>
              <div className={`${styles.imageWrapper} ${styles.image3}`}>
                <img src={getImageFormat(aboutUs?.photos?.[2], 'medium')} alt="Tasnim Travel" />
              </div>
              <div className={`${styles.imageWrapper} ${styles.image4}`}>
                <img src={getImageFormat(aboutUs?.photos?.[3], 'medium')} alt="Tasnim Travel" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Статистика */}
      <section className={styles.statsSection}>
        <Container>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statText}>{stat.text}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Наши ценности */}
      <section className={styles.valuesSection}>
        <Container>
          <SectionTitle className={styles.valueTitle}>{t("aboutUs.values.title")}</SectionTitle>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <img src={value.icon} alt={value.title} className={styles.valueIcon} />
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Команда */}
      <section className={styles.teamSection}>
        <Container>
          <div className={styles.teamHeader}>
            <SectionTitle>{t("aboutUs.team.title")}</SectionTitle>
            <div className={styles.teamIntro}>
              <p>{t("aboutUs.team.description")}</p>
            </div>
          </div>
          
          <div className={styles.teamGrid}>
            {team?.map((member, index) => (
              <div key={member.id} className={styles.teamCard}>
                <div className={styles.teamImageContainer}>
                  <div className={styles.imageWrapper}>
                    <img src={getImageFormat(member.photo, 'thumbnail')} alt={member.name} className={styles.teamImage} />
                  </div>
                </div>
                <div className={styles.teamInfo}>
                  <h3>{member.name}</h3>
                  <h4>{member.position}</h4>
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.teamFooter}>
            <p>{t("aboutUs.team.footer")}</p>
          </div>
        </Container>
      </section>

    </div>
  );
};

export default AboutUs;