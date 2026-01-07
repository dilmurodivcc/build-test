"use client";

import { NextIntlClientProvider } from "next-intl";
import { createContext, useContext, useState, useEffect } from "react";

import ru from '@/messages/ru.json';
import uz from '@/messages/uz.json';
import en from '@/messages/en.json';

const messages = { ru, uz, en };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState("ru"); // ru по умолчанию

  const languages = ["ru", "uz", "en"];

  // Загружаем сохраненный язык при инициализации
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && languages.includes(savedLang)) {
      setCurrentLang(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    setCurrentLang((prev) => {
      const currentIndex = languages.indexOf(prev);
      const nextIndex = (currentIndex + 1) % languages.length;
      const newLang = languages[nextIndex];
      localStorage.setItem('language', newLang);
      return newLang;
    });
  };

  const setLanguage = (lang) => {
    if (languages.includes(lang)) {
      setCurrentLang(lang);
      localStorage.setItem('language', lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language: currentLang, toggleLanguage, setLanguage, languages }}>
      <NextIntlClientProvider
        messages={messages[currentLang]}
        locale={currentLang}
        timeZone="Asia/Tashkent"
      >
        {children}
      </NextIntlClientProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
