import React from 'react';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transform rotate-45" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className={`${sizeClasses[size]} text-white transform -rotate-45`} />
        </div>
      </div>
      <span className={`font-bold ${
        size === 'sm' ? 'text-lg' : 
        size === 'md' ? 'text-xl' : 
        'text-2xl'
      } bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent`}>
        BrandSpark
      </span>
    </div>
  );
}; 