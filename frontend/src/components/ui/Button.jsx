import React from 'react';

/**
 * 🦇 Button Component - DracoPunk Style
 * 
 * Um botão que carrega alma e propósito.
 * Segue a filosofia: elegante, funcional, com personalidade.
 * 
 * @param {Object} props - Props do componente
 * @param {string} props.variant - Variante do botão (primary, secondary, ghost)
 * @param {string} props.size - Tamanho (sm, md, lg)
 * @param {boolean} props.disabled - Se está desabilitado
 * @param {Function} props.onClick - Função de clique
 * @param {React.ReactNode} props.children - Conteúdo do botão
 */
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  onClick, 
  children, 
  className = '',
  ...props 
}) => {
  // Classes base - sempre presentes
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variantes - cada uma com sua personalidade
  const variants = {
    primary: 'bg-gray-900 hover:bg-gray-800 text-white focus:ring-gray-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  };
  
  // Tamanhos - cada um com seu ritmo
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  // Estado desabilitado - quando a alma está em pausa
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer transform hover:scale-105 active:scale-95';
  
  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${disabledClasses}
    ${className}
  `.trim();
  
  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
