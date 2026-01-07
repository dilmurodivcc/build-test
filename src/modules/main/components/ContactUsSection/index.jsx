"use client";

import { useState } from 'react';
import styles from './index.module.scss';
import Container from '@/components/Container';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import SectionTitle from '@/components/SectionTitle';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from 'next-intl';

const ContactUsSection = () => {
  const {language} = useLanguage();
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contacts" className={styles.contactSection}>
      <Container>
        <div className={styles.content}>
          <SectionTitle className={styles.title}>{t("main.contactUs")}</SectionTitle>
          <p className={styles.subtitle}>
            {t("main.contactSubtitle")}
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("main.form.name")}
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
                placeholder={t("main.form.email")}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("main.form.message")}
                required
                className={styles.textarea}
                rows={4}
              />
            </div>

            <div className={styles.buttonContainer}>
              <PrimaryButton type="submit">
                {t("main.form.sendMessage")}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default ContactUsSection;