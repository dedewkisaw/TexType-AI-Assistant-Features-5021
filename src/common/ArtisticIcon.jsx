import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { FiAlertTriangle } from 'react-icons/fi';

// Enhanced artistic icon component that adds decorative elements
const ArtisticIcon = ({ icon, name, size = 'md', animated = false, glow = false, ...props }) => {
  let IconComponent;
  
  try {
    IconComponent = icon || (name && FiIcons[`Fi${name}`]);
  } catch (e) {
    IconComponent = null;
  }
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm p-1.5',
    md: 'text-lg p-2',
    lg: 'text-xl p-2.5',
    xl: 'text-2xl p-3'
  };
  
  // Generate random rotation for artistic effect
  const randomRotation = Math.floor(Math.random() * 20) - 10;
  
  // Base styles with conditional animations
  const baseClass = `
    ${sizeClasses[size] || sizeClasses.md}
    relative
    flex items-center justify-center
    rounded-full
    ${animated ? 'icon-wrapper' : 'icon-static'}
    ${glow ? 'glow-sm' : ''}
    ${props.className || ''}
  `;
  
  // If no valid icon, return warning icon
  if (!IconComponent) {
    return (
      <div className={baseClass}>
        <FiAlertTriangle className={`text-yellow-400 ${props.className || ''}`} />
      </div>
    );
  }
  
  // Return the enhanced icon without the orb
  return (
    <div className={animated ? 'icon-container' : ''}>
      <div className={baseClass}>
        {React.createElement(IconComponent, {
          ...props,
          className: `relative z-10 ${props.className || ''}`
        })}
        
        {/* Background gradient */}
        <div 
          className="absolute inset-0 rounded-full opacity-20 bg-gradient-to-br from-purple-400 to-pink-400"
          style={{ transform: `rotate(${randomRotation}deg)` }}
        ></div>
        
        {/* Removed the orb - no longer rendering the highlight dot */}
      </div>
    </div>
  );
};

export default ArtisticIcon;