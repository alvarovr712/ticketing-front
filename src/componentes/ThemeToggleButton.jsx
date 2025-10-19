import React from 'react';
import { useTheme } from '../context/ThemeContext';
import '../estilos/ThemeToggleButton.css'; 

const ThemeToggleButton = () => {

 const { theme, toggleTheme } = useTheme();
 return ( <button onClick={toggleTheme} className="btn-theme-toggle">

{theme === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro'} </button> );
};

export default ThemeToggleButton;