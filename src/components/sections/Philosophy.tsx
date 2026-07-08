import { useState, useRef, useEffect } from 'react';
import { Coffee, ShieldCheck, Heart } from 'lucide-react';
import './Philosophy.css';

export default function Philosophy() {
  const [isVisible, setIsVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 3, y: y * -3 }); // Subtle 3D tilt (max 3 degrees)
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const frameStyle = {
    opacity: isVisible ? 1 : 0,
    transform: !isVisible
      ? 'translateY(20px)'
      : isHovered && !isMobile
        ? `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.02) translateY(0)`
        : isHovered && isMobile
          ? 'scale(1.02) translateY(0)'
          : 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1) translateY(0)',
    boxShadow: isHovered
      ? '0 25px 50px -12px rgba(182, 106, 34, 0.22), 0 0 25px rgba(217, 164, 65, 0.3)'
      : 'var(--shadow-medium)',
    borderColor: isHovered
      ? 'rgba(217, 164, 65, 0.6)'
      : 'rgba(255, 255, 255, 0.45)',
    transition: !isVisible
      ? 'opacity 700ms ease-out, transform 700ms ease-out'
      : isHovered
        ? 'transform 0.08s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out'
        : 'opacity 700ms ease-out, transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 500ms cubic-bezier(0.16, 1, 0.3, 1), border-color 500ms cubic-bezier(0.16, 1, 0.3, 1)',
    cursor: 'pointer',
    borderRadius: '30px',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    overflow: 'hidden',
    aspectRatio: '1 / 1.1',
    background: 'linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%)',
    position: 'relative' as const,
    zIndex: 2
  };

  const pillars = [
    {
      icon: <ShieldCheck className="pillar-icon" size={24} />,
      title: 'Curated Sourcing',
      desc: 'We source organic, single-origin leaves from heritage gardens in Japan, Taiwan, and India, ensuring fair trade and pristine quality.'
    },
    {
      icon: <Coffee className="pillar-icon" size={24} />,
      title: 'Precision Temperature',
      desc: 'Each tea variety requires specific heat. We custom-brew each teapot with filtered water heated to its exact optimal degree.'
    },
    {
      icon: <Heart className="pillar-icon" size={24} />,
      title: 'Mindful Connection',
      desc: 'We believe tea is an invitation to slow down. Our space and team are dedicated to creating peaceful, welcoming rituals.'
    }
  ];

  return (
    <section className="philosophy-section" id="philosophy">
      <div className="container philosophy-grid">
        {/* Left: Image/Video Showcase */}
        <div className="philosophy-visual">
          <div 
            ref={containerRef}
            className="philosophy-image-container"
            style={frameStyle}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isVisible && (
              <video
                src="/videos/funny-tea-shop.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="philosophy-video"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            )}
          </div>
          <div className="philosophy-accent-border"></div>
        </div>

        {/* Right: Narrative */}
        <div className="philosophy-content">
          <span className="badge badge-green">Our Philosophy</span>
          <h2 className="philosophy-title">
            Brewing moments of slow clarity.
          </h2>
          <p className="philosophy-lead">
            Funny Tea was founded on a simple belief: in a fast-paced world, there is power in taking time to brew. Our process celebrates the natural profiles of whole tea leaves, handled with precision and served with warmth.
          </p>

          <div className="philosophy-pillars">
            {pillars.map((pillar, i) => (
              <div className="pillar-card" key={i}>
                <div className="pillar-icon-wrapper flex-center">
                  {pillar.icon}
                </div>
                <div className="pillar-info">
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
