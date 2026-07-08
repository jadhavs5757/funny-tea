import { useState, useRef } from 'react';
import { ArrowRight, Leaf } from 'lucide-react';
import Button from '../ui/Button';
import './Hero.css';

const WHATSAPP_URL = `https://wa.me/919989131798?text=${encodeURIComponent(
  "Hi Funny Tea! 👋\n\nI visited your website and would like to place an order.\n\nPlease share today's menu and availability.\n\nThank you!"
)}`;

export default function Hero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Maximum tilt of 10 degrees for subtle premium feel
    setTilt({ x: x * 10, y: y * -10 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const transformStyle = {
    transform: isHovered
      ? `perspective(1200px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1.02)`
      : `perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1)`,
    transition: isHovered ? 'transform 0.05s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
  };

  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        {/* Left Content Column */}
        <div className="hero-content animate-fade-in-up">
          <div className="hero-branding">
            <img 
              src="/images/logo/funny-tea-logo.png" 
              className="hero-logo" 
              alt="Funny Tea Logo" 
            />
            <span className="hero-tagline">Every Cup. Every Moment.</span>
          </div>

          <div className="badge badge-green hero-badge">
            <Leaf size={14} style={{ color: 'var(--color-green)' }} />
            <span>Slow-Brewed Sanctuary</span>
          </div>
          
          <p className="hero-description">
            Freshly brewed tea, delicious snacks, and warm hospitality crafted with care. Every visit to Funny Tea is made to bring comfort, flavour, and happiness.
          </p>
          
          <div className="hero-actions">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" icon={<ArrowRight size={18} />}>
                Order on WhatsApp
              </Button>
            </a>
            <a href="#collection">
              <Button variant="secondary">
                Explore Menu
              </Button>
            </a>
          </div>
        </div>

        {/* Right Visual Column */}
        <div className="hero-visual animate-fade-in-up delay-200">
          {/* Ambient Warm Glow */}
          <div className="ambient-glow"></div>
          
          <div 
            ref={frameRef}
            className="hero-image-wrapper"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={transformStyle}
          >
            <div className="image-placeholder hero-placeholder glass-effect" style={{ overflow: 'hidden', padding: 0, border: 'none', background: 'transparent' }}>
              <video 
                src="/videos/hero-tea.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Layered Parallax Floating Tea Leaves */}
            <div className="floating-leaf leaf-1">
              <Leaf size={22} fill="var(--color-green)" stroke="var(--color-green)" />
            </div>
            <div className="floating-leaf leaf-2">
              <Leaf size={16} fill="var(--color-primary)" stroke="var(--color-primary)" />
            </div>
            <div className="floating-leaf leaf-3">
              <Leaf size={26} fill="var(--color-accent)" stroke="var(--color-accent)" />
            </div>

            {/* Elegant glassmorphic floating details */}
            <div className="floating-card floating-card-1 glass-effect">
              <span className="floating-card-num">100%</span>
              <span className="floating-card-text">Organic Leaves</span>
            </div>
            <div className="floating-card floating-card-2 glass-effect">
              <span className="floating-card-num">80°C</span>
              <span className="floating-card-text">Precision Brewed</span>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
