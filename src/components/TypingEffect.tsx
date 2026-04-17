import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  tag?: 'p' | 'div' | 'span' | 'h1' | 'h2' | 'h3';
}

export const TypingEffect: React.FC<TypingEffectProps> = ({ 
  text, 
  speed = 10, 
  onComplete, 
  className = "",
  tag = 'p'
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Reset if text changes
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  const Tag = tag;

  return (
    <Tag className={`${className} ${currentIndex < text.length ? 'typing-cursor' : ''}`}>
      {displayedText}
    </Tag>
  );
};
