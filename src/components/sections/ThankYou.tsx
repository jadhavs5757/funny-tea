import { useRef, useState, useEffect } from 'react';
import { Leaf, ArrowRight, Phone } from 'lucide-react';
import Button from '../ui/Button';
import './ThankYou.css';

export default function ThankYou() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`thankyou-section ${isVisible ? 'animate-in' : ''}`}
    >
      {/* Background Decorative Elements */}
      <div className="thankyou-bg-elements">
        <div className="thankyou-glow-particles">
          <span className="glow-particle gp-1"></span>
          <span className="glow-particle gp-2"></span>
          <span className="glow-particle gp-3"></span>
          <span className="glow-particle gp-4"></span>
        </div>
        
        {/* Animated Steam Lines */}
        <div className="thankyou-steam-container">
          <span className="thankyou-steam-line sl-1"></span>
          <span className="thankyou-steam-line sl-2"></span>
          <span className="thankyou-steam-line sl-3"></span>
        </div>

        {/* Slow Floating Tea Leaves */}
        <div className="thankyou-leaves">
          <div className="thankyou-leaf tl-1">
            <Leaf size={24} fill="rgba(95, 127, 82, 0.12)" stroke="rgba(95, 127, 82, 0.25)" />
          </div>
          <div className="thankyou-leaf tl-2">
            <Leaf size={18} fill="rgba(182, 106, 34, 0.1)" stroke="rgba(182, 106, 34, 0.2)" />
          </div>
          <div className="thankyou-leaf tl-3">
            <Leaf size={28} fill="rgba(217, 164, 65, 0.08)" stroke="rgba(217, 164, 65, 0.18)" />
          </div>
        </div>
      </div>

      <div className="container thankyou-container">
        {/* Content Details */}
        <div className="thankyou-content">
          <span className="badge badge-green thankyou-badge">Thank You For Visiting</span>
          <h2 className="thankyou-title">Every Cup Begins With a Smile.</h2>
          <p className="thankyou-desc-p1">
            Thank you for choosing Funny Tea.
          </p>
          <p className="thankyou-desc-p2">
            Whether you're stopping by for your morning tea, an evening snack, or simply sharing good moments with friends and family, we're always delighted to serve you with warmth, quality, and a smile.
          </p>
          <p className="thankyou-desc-p3">
            We look forward to welcoming you soon.
          </p>
        </div>

        {/* Actions Buttons */}
        <div className="thankyou-actions">
          <a 
            href="https://wa.me/919989131798?text=Hi%20Funny%20Tea!%20I%20would%20like%20to%20place%20an%20order."
            target="_blank" 
            rel="noopener noreferrer"
            className="thankyou-action-link-btn"
          >
            <Button variant="primary" icon={<ArrowRight size={18} />}>
              Order on WhatsApp
            </Button>
          </a>
          <a 
            href="tel:+919989131798"
            className="thankyou-action-link-btn"
          >
            <Button variant="secondary" icon={<Phone size={16} />}>
              Call Us
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
