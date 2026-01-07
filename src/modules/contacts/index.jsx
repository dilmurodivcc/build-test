"use client";

import Header from "@/components/Header";
import Container from "@/components/Container";
import styles from "./index.module.scss";
import SectionTitle from "@/components/SectionTitle";
import Footer from "@/components/Footer";
import Script from "next/script";
import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import strapiRequest from "@/api/strapiRequest";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslations } from "next-intl";

const Contacts = () => {
  const {language} = useLanguage();
  const t = useTranslations();
  const { data: contacts, isLoading: contactsIsLoading } = useQuery({
    queryKey: ["CONTACTS", language],
    queryFn: () => strapiRequest.get("/contact", { params: { locale: language } }),
    select: (res) => res.data,
  });

  const contactItems = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.9999 16.9201V19.9201C22.0011 20.1986 21.944 20.4743 21.8324 20.7294C21.7209 20.9846 21.5572 21.2137 21.352 21.402C21.1468 21.5902 20.9045 21.7336 20.6407 21.8228C20.3769 21.912 20.0973 21.9452 19.8199 21.9201C16.7428 21.5857 13.7869 20.5342 11.1899 18.8501C8.77376 17.3148 6.72527 15.2663 5.18993 12.8501C3.49991 10.2413 2.44818 7.27109 2.11993 4.1801C2.09494 3.90356 2.12781 3.62486 2.21643 3.36172C2.30506 3.09859 2.4475 2.85679 2.63477 2.65172C2.82203 2.44665 3.05011 2.28281 3.30421 2.17062C3.55832 2.05843 3.83299 2.00036 4.10993 2.0001H7.10993C7.59524 1.99532 8.06572 2.16718 8.43369 2.48363C8.80166 2.80008 9.04201 3.23954 9.10993 3.7201C9.23656 4.68016 9.47138 5.62282 9.80993 6.5301C9.94448 6.88802 9.9736 7.27701 9.89384 7.65098C9.81408 8.02494 9.6288 8.36821 9.35993 8.6401L8.08993 9.9101C9.51349 12.4136 11.5864 14.4865 14.0899 15.9101L15.3599 14.6401C15.6318 14.3712 15.9751 14.1859 16.3491 14.1062C16.723 14.0264 17.112 14.0556 17.4699 14.1901C18.3772 14.5286 19.3199 14.7635 20.2799 14.8901C20.7657 14.9586 21.2093 15.2033 21.5265 15.5776C21.8436 15.9519 22.0121 16.4297 21.9999 16.9201Z"
            stroke="#01797B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: t("contacts.phone"),
      content: contacts?.phone,
      link: `tel:${contacts?.phone}`,
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
            stroke="#01797B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 6L12 13L2 6"
            stroke="#01797B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: t("contacts.email"),
      content: contacts?.email,
      link: `mailto:${contacts?.email}`,
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
            stroke="#01797B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
            stroke="#01797B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: t("contacts.address"),
      content: contacts?.address,
      link: "https://yandex.uz/maps/-/CDa0rS0y",
    },
  ];

  const socialLinks = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
            stroke="#01797B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 11.3701C16.1234 12.2023 15.9813 13.0523 15.5938 13.7991C15.2063 14.5459 14.5932 15.1515 13.8416 15.5297C13.0901 15.908 12.2385 16.0397 11.4078 15.906C10.5771 15.7723 9.80977 15.3801 9.21485 14.7852C8.61993 14.1903 8.22774 13.4229 8.09408 12.5923C7.96042 11.7616 8.09208 10.91 8.47034 10.1584C8.8486 9.40691 9.4542 8.7938 10.201 8.4063C10.9478 8.0188 11.7978 7.87665 12.63 8.00006C13.4789 8.12594 14.2649 8.52152 14.8717 9.12836C15.4785 9.73521 15.8741 10.5211 16 11.3701Z"
            stroke="#01797B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 6.5H17.51"
            stroke="#01797B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: t("contacts.instagram"),
      link: contacts?.instagram,
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 2L11 13"
            stroke="#01797B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 2L15 22L11 13L2 9L22 2Z"
            stroke="#01797B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: t("contacts.telegram"),
      link: contacts?.telegram,
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.4054 3.4875C18.1607 1.2375 15.1714 0 12.0054 0C5.43214 0 0.0964355 5.33571 0.0964355 11.9089C0.0964355 14.0089 0.687864 16.0446 1.79143 17.8446L0 24L6.30964 22.2482C8.03571 23.2607 10.0018 23.7964 12.0054 23.7964H12.0107C18.5839 23.7964 24 18.4607 24 11.8875C24 8.72143 22.65 5.7375 20.4054 3.4875ZM12.0054 21.7875C10.2214 21.7875 8.47499 21.2732 6.95357 20.3036L6.59464 20.0893L2.85535 21.1339L3.91607 17.4964L3.67499 17.1214C2.61428 15.5357 2.04642 13.7518 2.04642 11.9089C2.04642 6.44464 6.54642 2.00893 12.0107 2.00893C14.6518 2.00893 17.1321 3.02679 19.0018 4.90179C20.8714 6.77679 21.9643 9.25714 21.9589 11.8875C21.9589 17.3571 17.4643 21.7875 12.0054 21.7875ZM17.4482 14.4054C17.1589 14.2607 15.6857 13.5375 15.4179 13.4411C15.1499 13.3393 14.9518 13.2911 14.7589 13.5857C14.5661 13.8804 13.9928 14.5554 13.8161 14.7536C13.6446 14.9464 13.4679 14.9732 13.1786 14.8286C11.4857 13.9821 10.3821 13.3179 9.27321 11.3839C8.97856 10.8857 9.59999 10.9232 10.1786 9.76607C10.275 9.56786 10.2268 9.39643 10.1518 9.25179C10.0768 9.10714 9.47142 7.63393 9.22499 7.04464C8.98392 6.47143 8.73749 6.55179 8.55535 6.54107C8.38392 6.53036 8.18571 6.53036 7.98749 6.53036C7.78928 6.53036 7.47321 6.60536 7.20535 6.89464C6.93749 7.18929 6.16606 7.91786 6.16606 9.39107C6.16606 10.8643 7.23749 12.2839 7.38214 12.4821C7.53214 12.6804 9.46606 15.6643 12.4232 16.9607C14.3036 17.7857 15.0482 17.8607 15.9964 17.7C16.5857 17.5875 17.7911 16.9446 18.0375 16.2589C18.2839 15.5732 18.2839 14.9839 18.2089 14.8554C18.1393 14.7161 17.9411 14.6357 17.4482 14.4054Z" fill="#01797B"/>
        </svg>
      ),
      title: t("contacts.whatsapp"),
      link: contacts?.whatsapp,
    },
  ];

  if (contactsIsLoading) return <Loader />;

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Container className={styles.container}>
          <div className={styles.heroContent}>
            <h1>{t("contacts.title")}</h1>
            <p>{t("contacts.subtitle")}</p>
          </div>
        </Container>
      </section>

      {/* Контактная информация */}
      <section className={styles.contactsSection}>
        <Container>
          <div className={styles.contactsGrid}>
            <div className={styles.contactInfo}>
              <SectionTitle>{t("contacts.contactInfo")}</SectionTitle>
              <div className={styles.contactsList}>
                {contactItems.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.link}
                    className={styles.contactItem}
                    target={
                      contact.link.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      contact.link.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    <div className={styles.icon}>{contact.icon}</div>
                    <div className={styles.content}>
                      <h3>{contact.title}</h3>
                      <p>{contact.content}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className={styles.socialLinks}>
                <h3>{t("contacts.socialLinks")}</h3>
                <div className={styles.socialGrid}>
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      className={styles.socialItem}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className={styles.icon}>{social.icon}</div>
                      <span>{social.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.mapContainer}>
              <div id="map" className={styles.map}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.4460980753665!2d69.26250277611243!3d41.32091200011579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bd2c8550d8d%3A0x8e6b546a3a0cda1f!2sLLC%20%22Tasnim-Travel%22!5e0!3m2!1sru!2s!4v1755968876793!5m2!1sru!2s"
                    width="100%"
                    height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                {/* <iframe
                    src="https://yandex.uz/map-widget/v1/?ll=69.316911%2C41.333900&mode=search&oid=132541696559&ol=biz&z=17.51"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    // style="position:relative;"
                  ></iframe> */}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* <Footer /> */}

      {/* Яндекс Карты */}
      {/* <Script 
        src="https://api-maps.yandex.ru/2.1/?apikey=ваш_API_ключ&lang=ru_RU" 
        strategy="beforeInteractive"
        onLoad={() => {
          window.ymaps.ready(() => {
            const map = new window.ymaps.Map('map', {
              center: [41.311151, 69.279737], // Координаты Ташкента
              zoom: 16
            });

            const placemark = new window.ymaps.Placemark([41.311151, 69.279737], {
              balloonContent: 'Tasnim Travel'
            }, {
              preset: 'islands#greenDotIconWithCaption'
            });

            map.geoObjects.add(placemark);
          });
        }}
      /> */}
    </div>
  );
};

export default Contacts;
