import React, { useState, useRef, useEffect } from 'react';

interface CardProps {
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  badgeType?: 'default' | 'green';
  imageUrl?: string;
  imagePlaceholderTitle?: string;
  imagePlaceholderDesc?: string;
  footer?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  isHotTea?: boolean;
}

export default function Card({
  title,
  subtitle,
  description,
  badge,
  badgeType = 'default',
  imageUrl,
  imagePlaceholderTitle = 'Tea Selection',
  imagePlaceholderDesc = 'Brew showcase visual placeholder',
  footer,
  className = '',
  children,
  isHotTea = false
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: y * -8 }); // Max 8 degrees tilt
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const cardStyle = {
    transform: isHovered && !isMobile
      ? `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateY(-8px)`
      : isHovered && isMobile
        ? 'translateY(-8px)'
        : 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)',
    boxShadow: isHovered
      ? '0 25px 50px -12px rgba(182, 106, 34, 0.16), 0 0 25px rgba(217, 164, 65, 0.22)'
      : 'var(--shadow-soft)',
    transition: isHovered 
      ? 'transform 0.05s ease-out, box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)' 
      : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    position: 'relative' as const,
    overflow: 'hidden' as const
  };

  return (
    <div 
      ref={cardRef}
      className={`card ${className}`}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Badge */}
      {badge && (
        <span 
          className={`badge ${badgeType === 'green' ? 'badge-green' : ''}`}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 10 }}
        >
          {badge}
        </span>
      )}

      {/* Image or CSS Placeholder */}
      <div className="card-media" style={{ marginBottom: '1.5rem', borderRadius: 'var(--radius-md)', overflow: 'hidden', position: 'relative' }}>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="card-image"
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', aspectRatio: '4/3' }}
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">
            <span className="image-placeholder-title">{imagePlaceholderTitle}</span>
            <span className="image-placeholder-desc">{imagePlaceholderDesc}</span>
          </div>
        )}

        {/* Tiny steam animation overlay for hot tea products on card hover */}
        {isHotTea && isHovered && (
          <div className="card-steam-overlay">
            <div className="card-steam-line c-steam-1"></div>
            <div className="card-steam-line c-steam-2"></div>
            <div className="card-steam-line c-steam-3"></div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="card-content" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {subtitle && (
          <span className="card-subtitle" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {subtitle}
          </span>
        )}
        <h3 className="card-title" style={{ color: 'var(--color-text)', fontSize: '1.35rem', fontWeight: 600 }}>
          {title}
        </h3>
        <p className="card-desc" style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.5', marginTop: '0.25rem' }}>
          {description}
        </p>
        
        {children}

        {/* Footer */}
        {footer && (
          <div className="card-footer" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
