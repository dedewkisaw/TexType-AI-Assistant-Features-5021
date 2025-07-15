import React from 'react';
import { motion } from 'framer-motion';

// Reusable glassmorphic card component
const CardGlassmorphic = ({ 
  children, 
  className = '', 
  hoverEffect = true,
  glowEffect = false,
  motionProps = {},
  ...props 
}) => {
  return (
    <motion.div
      className={`
        card-glassmorphic
        ${hoverEffect ? 'hover-lift' : ''}
        ${glowEffect ? 'glow-sm' : ''}
        ${className}
      `}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default CardGlassmorphic;