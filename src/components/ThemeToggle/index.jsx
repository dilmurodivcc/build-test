"use client";

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import styles from './index.module.scss';
import { HiMoon } from "react-icons/hi";
import { HiSun } from "react-icons/hi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'dark' ? <HiMoon /> : <HiSun />}
    </button>
  );
};

export default ThemeToggle;
