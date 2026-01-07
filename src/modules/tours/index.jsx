"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Container from "@/components/Container";
import styles from "./index.module.scss";
import SectionTitle from "@/components/SectionTitle";
import Footer from "@/components/Footer";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import { useQuery } from "@tanstack/react-query";
import strapiRequest from "@/api/strapiRequest";
import Loader from "@/components/Loader";
import getImageFormat from "@/utils/getImageFormat";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslations } from "next-intl";

const Tours = () => {
  const {language} = useLanguage();
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  // const tours = [
  //   {
  //     id: 1,
  //     title: "Роскошный Дубай",
  //     category: "luxury",
  //     duration: "7 дней",
  //     price: "от $2,500",
  //     image: "/direction-1.jpg",
  //     features: ["5★ отели", "Персональный гид", "VIP-трансфер"],
  //     description:
  //       "Эксклюзивный тур в Дубай с проживанием в лучших отелях и индивидуальной программой.",
  //   },
  //   {
  //     id: 2,
  //     title: "Святыни Мекки",
  //     category: "pilgrimage",
  //     duration: "10 дней",
  //     price: "от $1,800",
  //     image: "/direction-2.jpg",
  //     features: ["Опытный проводник", "Все включено", "Помощь в оформлении"],
  //     description:
  //       "Организованное паломничество с полным сопровождением и поддержкой.",
  //   },
  //   {
  //     id: 3,
  //     title: "Групповой тур в Малайзию",
  //     category: "group",
  //     duration: "12 дней",
  //     price: "от $1,500",
  //     image: "/direction-3.jpg",
  //     features: ["Русский гид", "Экскурсии", "Комфорт-класс"],
  //     description:
  //       "Увлекательное путешествие по самым интересным местам Малайзии в компании единомышленников.",
  //   },
  //   {
  //     id: 4,
  //     title: "Выходные в Самарканде",
  //     category: "weekend",
  //     duration: "3 дня",
  //     price: "от $300",
  //     image: "/direction-4.jpg",
  //     features: ["Исторические места", "Трансфер", "Питание"],
  //     description:
  //       "Короткий, но насыщенный тур по историческим местам древнего Самарканда.",
  //   },
  //   {
  //     id: 5,
  //     title: "VIP тур в Стамбул",
  //     category: "luxury",
  //     duration: "5 дней",
  //     price: "от $2,000",
  //     image: "/main-1.jpg",
  //     features: ["Люкс отели", "Частные экскурсии", "Премиум сервис"],
  //     description:
  //       "Изысканное путешествие в Стамбул с индивидуальной программой и размещением в лучших отелях.",
  //   },
  //   {
  //     id: 6,
  //     title: "Групповой тур в ОАЭ",
  //     category: "group",
  //     duration: "8 дней",
  //     price: "от $1,200",
  //     image: "/main-2.jpeg",
  //     features: ["4★ отели", "Экскурсии", "Шопинг"],
  //     description:
  //       "Увлекательное путешествие по эмиратам с посещением главных достопримечательностей.",
  //   },
  // ];

  const { data: tourTypes, isLoading: tourTypesIsLoading } = useQuery({
    queryKey: ["TOUR_TYPES", language],
    queryFn: () =>
      strapiRequest.get("/tour-types", { params: { locale: language } }),
    select: (res) => res.data,
  });


  const { data: tours, isLoading: toursIsLoading } = useQuery({
    queryKey: ["TOURS", language],
    queryFn: () =>
      strapiRequest.get("/tours", { params: { locale: language, populate: "*" } }),
    select: (res) => res.data,
  });

  const filteredTours = useMemo(() => {
    return tours?.filter((tour) => {
      if (activeCategory === "all") return true;
      return tour.tour_type.id === activeCategory;
    }) || [];
  }, [activeCategory, tours]);

  if (tourTypesIsLoading || toursIsLoading) return <Loader />;

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Container className={styles.container}>
          <div className={styles.heroContent}>
            <h1>{t("tours.title")}</h1>
            <p>{t("tours.subtitle")}</p>
          </div>
        </Container>
      </section>

      {/* Tours Section */}
      <section className={styles.toursSection}>
        <Container>
          <div className={styles.categoriesFilter}>
            <button
              className={`${styles.categoryButton} ${
                activeCategory === "all" ? styles.active : ""
              }`}
              onClick={() => setActiveCategory("all")}
            >
              {t("tours.allTours")}
            </button>
            {tourTypes?.map((type) => (
              <button
                key={type.id}
                className={`${styles.categoryButton} ${
                  type.id === activeCategory ? styles.active : ""
                }`}
                onClick={() => setActiveCategory(type.id)}
              >
                {type.title}
              </button>
            ))}
          </div>

          <div className={styles.toursGrid}>
            {filteredTours?.map((tour) => (
              <Link href={`/tours/${tour?.documentId}`} key={tour?.id} className={styles.tourCard}>
                <div className={styles.imageWrapper}>
                  <img src={getImageFormat(tour.preview_photo, 'medium')} alt={tour.title} />
                  <div className={styles.duration}>{tour.days} дней</div>
                  <div className={styles.price}>от {tour.price} $</div>
                </div>
                <div className={styles.content}>
                  <h3>{tour.title}</h3>
                  <p>{tour.description}</p>
                  <div className={styles.features}>
                    {tour.tags.map((tag, index) => (
                      <span key={tag.id} className={styles.feature}>
                        {tag.title}
                      </span>
                    ))}
                  </div>
                  <PrimaryButton className={styles.button}>
                    {t("tours.more")}
                  </PrimaryButton>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <Container>
          <div className={styles.contactWrapper}>
            <div className={styles.contactInfo}>
              <h2>{t("tours.notFound")}</h2>
              <p>
                {t("tours.contactSubtitle")}
              </p>
            </div>
            <div className={styles.formWrapper}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("tours.form.name")}
                    required
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("tours.form.email")}
                    required
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("tours.form.message")}
                    required
                    className={styles.textarea}
                    rows={4}
                  />
                </div>

                <div className={styles.buttonContainer}>
                  <PrimaryButton type="submit">{t("tours.form.sendMessage")}</PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Tours;
