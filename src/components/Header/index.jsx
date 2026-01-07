"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import Container from "../Container";
import styles from "./index.module.scss";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslations } from "next-intl";
import ThemeToggle from "../ThemeToggle";
import { useTheme } from "@/context/ThemeContext";



const Header = () => {
  const t = useTranslations();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { language: currentLang, setLanguage, languages } = useLanguage();
  const pathname = usePathname();
  const { theme } = useTheme();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLangDropdownOpen && !event.target.closest(`.${styles.langDropdown}`)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isLangDropdownOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const vh = window.innerHeight;
      setIsScrolled(scrollPosition > vh);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (link) => {
    if (link === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(link);
  };

  const navItems = [
    {
      label: t("header.home"),
      link: "/",
    },
    {
      label: t("header.aboutUs"),
      link: "/about-us",
    },
    {
      label: t("header.tours"),
      link: "/tours",
    },
    {
      label: t("header.transfers"),
      link: "/transfers",
    },
    {
      label: t("header.gallery"),
      link: "/tour-gallery",
    },
    {
      label: t("header.contacts"),
      link: "/contacts",
    },
  ];

  const logoSrc = theme === "dark" ? "/logoLight.png" : "/logoDark.png";

  const getFlagSrc = (lang) => {
    const flagMap = {
      en: "/en.jpg",
      ru: "/ru.png",
      uz: "/uz.avif"
    };
    return flagMap[lang] || "/en.jpg";
  };

  return (
    <div
      className={`${styles.header} ${isMenuOpen ? styles.menuOpen : ''} ${isScrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.headerTop}>
        <Link href="/">
          <img src={logoSrc} alt="Tasnim Travel logo" className={styles.logo} />
        </Link>

        <div className={styles.desktopNav}>
          <div className={styles.navbar}>
            {navItems.map((item) => (
              <Link
                href={item.link}
                key={item.label}
                className={`${styles.navItem} ${
                  isActive(item.link) ? styles.active : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.langDropdown}>
            <button 
              className={styles.langToggle}
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            >
              <img 
                src={getFlagSrc(currentLang)} 
                alt={currentLang?.toUpperCase()} 
                className={styles.flagIcon}
              />
            </button>
            {isLangDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {languages.map((lang) => (
                  <button
                    key={lang}
                    className={`${styles.dropdownItem} ${
                      currentLang === lang ? styles.active : ''
                    }`}
                    onClick={() => {
                      setLanguage(lang);
                      setIsLangDropdownOpen(false);
                    }}
                  >
                    <img 
                      src={getFlagSrc(lang)} 
                      alt={lang.toUpperCase()} 
                      className={styles.flagIcon}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          <ThemeToggle />
        </div>

        <button 
          className={`${styles.burgerButton} ${isMenuOpen ? styles.open : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileNav}>
          {navItems.map((item) => (
            <Link
              href={item.link}
              key={item.label}
              className={`${styles.mobileNavItem} ${
                isActive(item.link) ? styles.active : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className={styles.mobileControls}>
          <div className={styles.mobileLangDropdown}>
            <button 
              className={styles.mobileLangToggle}
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            >
              <img 
                src={getFlagSrc(currentLang)} 
                alt={currentLang?.toUpperCase()} 
                className={styles.mobileFlagIcon}
              />
            </button>
            {isLangDropdownOpen && (
              <div className={styles.mobileDropdownMenu}>
                {languages.map((lang) => (
                  <button
                    key={lang}
                    className={`${styles.mobileDropdownItem} ${
                      currentLang === lang ? styles.active : ''
                    }`}
                    onClick={() => {
                      setLanguage(lang);
                      setIsLangDropdownOpen(false);
                    }}
                  >
                    <img 
                      src={getFlagSrc(lang)} 
                      alt={lang.toUpperCase()} 
                      className={styles.mobileFlagIcon}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
