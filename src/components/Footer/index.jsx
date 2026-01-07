"use client";

import styles from './index.module.scss';
import Container from '@/components/Container';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import Loader from '../Loader';
import { useQuery } from '@tanstack/react-query';
import strapiRequest from '@/api/strapiRequest';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const {language} = useLanguage();
  const t = useTranslations();

  const { data: directions, isLoading: directionsIsLoading } = useQuery({
    queryKey: ['DIRECTIONS', language],
    queryFn: () => strapiRequest.get('/directions', { params: { populate: '*', locale: language } }),
    select: res => res.data
  })

  console.log("GGGG ->", { directions })

  const { data: contacts, isLoading: contactsIsLoading } = useQuery({
    queryKey: ["CONTACTS", language],
    queryFn: () => strapiRequest.get("/contact", { params: { locale: language } }),
    select: (res) => res.data,
  });

  if(directionsIsLoading || contactsIsLoading) return <Loader />

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <div className={styles.column}>
            <img className={styles.logo} src="/logoLight.png" alt="logo" />
          </div>

          <div className={styles.column}>
            <h3 className={styles.title}>{t("footer.contacts")}</h3>
            <div className={styles.contactList}>
              <a href={`tel:${contacts?.phone}`} className={styles.contactItem}>
                <FaPhone />
                <span>{contacts?.phone}</span>
              </a>
              <a href="mailto:info@tasnimtravel.com" className={styles.contactItem}>
                <FaEnvelope />
                <span>{contacts?.email}</span>
              </a>
              <div className={styles.contactItem}>
                <FaMapMarkerAlt />
                <span>{contacts?.address}</span>
              </div>
            </div>
          </div>

          <div className={styles.column}>
            <h3 className={styles.title}>{t("footer.directions")}</h3>
            <ul className={styles.linkList}>
              {
                directions?.map(direction => (
                  <li key={direction.id}>
                    <Link href={`/direction/${direction.id}`}>{direction.title}</Link>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className={styles.column}>
            <h3 className={styles.title}>{t("footer.socialLinks")}</h3>
            <div className={styles.socialLinks}>
              <a href={contacts?.instagram} className={styles.socialLink}>
                <FaInstagram />
              </a>
              <a href={contacts?.telegram} className={styles.socialLink}>
                <FaTelegram />
              </a>
              <a href={contacts?.whatsapp} className={styles.socialLink}>
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </Container>
      
      <div className={styles.bottom}>
        <Container>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Tasnim Travel. {t("footer.copyright")}
          </p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;