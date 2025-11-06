import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn(
      'bg-white rounded-xl shadow-lg border border-secondary-200',
      className
    )}>
      {children}
    </div>
  );
};

export default Card;


