import React from 'react';
import { motion } from 'framer-motion';

// Reusable neumorphic card component
const CardNeumorphic = ({ 
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
        card-neumorphic
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

export default CardNeumorphic;