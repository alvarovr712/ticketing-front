import React, { createContext, useState, useEffect, useContext } from 'react';

//  Crear el Contexto
const ThemeContext = createContext();

//  Crear el "Proveedor" del contexto
export const ThemeProvider = ({ children }) => {
  // Estado para guardar el tema (
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  //  Efecto para aplicar la clase al <body> y guardar en localStorage
  useEffect(() => {
    
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Guarda la preferencia en localStorage
    localStorage.setItem('theme', theme);
  }, [theme]); 

  //  Función para cambiar el tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Provee el estado y la función a todos los componentes "hijos"
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => {
  return useContext(ThemeContext);
};