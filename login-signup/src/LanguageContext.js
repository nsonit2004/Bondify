import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [fontFamily, setFontFamily] = useState('Julius Sans One, sans-serif'); // Phông mặc định cho tiếng Anh

  // Thay đổi phông chữ khi thay đổi ngôn ngữ
  useEffect(() => {
    if (language === 'en') {
      setFontFamily('Julius Sans One, sans-serif'); // Phông cho tiếng Anh
    } else if (language === 'vi') {
      setFontFamily('Noto Sans, sans-serif'); // Phông cho tiếng Việt
    }
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, fontFamily, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
