"use client"
import { useTranslations } from "next-intl";
import Container from '@/components/Container'
import SectionTitle from '@/components/SectionTitle'
import PrimaryButton from '@/components/Buttons/PrimaryButton'
import styles from './index.module.scss'
import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import strapiRequest from "@/api/strapiRequest";
import { useLanguage } from "@/context/LanguageContext";
import getImageFormat from "@/utils/getImageFormat";
import Link from "next/link";

const Transfers = () => {
  const {language} = useLanguage();
  const t = useTranslations();

  const benefits = [
    {
      icon: '/driver.svg',
      title: t('transfers.benefits.drivers.title'),
      description: t('transfers.benefits.drivers.description')
    },
    {
      icon: '/support.svg',
      title: t('transfers.benefits.support.title'),
      description: t('transfers.benefits.support.description')
    },
    {
      icon: '/price.svg',
      title: t('transfers.benefits.price.title'),
      description: t('transfers.benefits.price.description')
    },
    {
      icon: '/vip.svg',
      title: t('transfers.benefits.vip.title'),
      description: t('transfers.benefits.vip.description')
    }
  ]

  const { data: transfers, isLoading: transfersIsLoading } = useQuery({
    queryKey: ["TRANSFERS", language],
    queryFn: () =>
      strapiRequest.get("/transfers", {
        params: { populate: "*", locale: language },
      }),
    select: (res) => res.data,
  });

  const { data: contacts, isLoading: contactsIsLoading } = useQuery({
    queryKey: ["CONTACTS"],
    queryFn: () => strapiRequest.get("/contact", {  }),
    select: (res) => res.data,
  });

  if (transfersIsLoading || contactsIsLoading)
    return (
      <Loader />
    );

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Container className={styles.container}>
          <div className={styles.heroContent}>
            <h1>{t('transfers.hero.title')}</h1>
            <p>{t('transfers.hero.subtitle')}</p>
          </div>
        </Container>
      </section>

      {/* Transfers Section */}
      <section className={styles.transfersSection}>
        <Container>
          <div className={styles.transfersGrid}>
            {transfers?.map((transfer) => (
              <div key={transfer.id} id={transfer.id} className={styles.transferCard}>
                <div className={styles.imageWrapper}>
                  <img src={getImageFormat(transfer.image, 'medium')} alt={transfer.title} />
                  <div className={styles.overlay}>
                    <h2>{transfer.title}</h2>
                  </div>
                </div>
                <div className={styles.content}>
                  <div className={styles.directions}>
                    <h3>{t('transfers.card.directions')}</h3>
                    <ul>
                      {transfer?.directions
                        ?.filter((direction) => direction?.title?.trim())
                        .map((direction, idx) => (
                          <li key={direction.id}>{direction.title}</li>
                        ))}
                    </ul>
                  </div>

                  <div className={styles.cars}>
                    <h3>{t('transfers.card.cars')}</h3>
                    <div className={styles.carTags}>
                      {transfer.cars.map((car, idx) => (
                        <span key={car.id} className={styles.carTag}>{car?.title}</span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.action}>
                    <Link href={contacts?.whatsapp} target="_blank" rel="noopener noreferrer">
                      <PrimaryButton>
                        {t('transfers.card.bookButton')}
                      </PrimaryButton>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className={styles.benefitsSection}>
        <Container>
          <SectionTitle className={styles.benefitsTitle}>{t('transfers.benefits.title')}</SectionTitle>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <div key={index} className={styles.benefitCard}>
                <img src={benefit.icon} alt={benefit.title} className={styles.benefitIcon} />
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}

export default Transfers