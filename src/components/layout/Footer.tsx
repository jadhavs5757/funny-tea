import { useRef, useState, useEffect } from 'react';
import Button from '../ui/Button';
import './Footer.css';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer 
      ref={footerRef}
      className={`footer ${isVisible ? 'animate-in' : ''}`} 
      id="contact"
    >
      <div className="container footer-grid">
        {/* Column 1: Brand Info */}
        <div className="footer-col footer-brand-col">
          <a href="#home" className="footer-logo-wrapper">
            <img 
              src="/images/logo/funny-tea-logo.png" 
              alt="Funny Tea Logo" 
              className="footer-logo-img-new" 
              loading="lazy"
            />
          </a>
          <div className="footer-brand-text">
            <h3 className="footer-brand-title">FUNNY TEA</h3>
            <p className="footer-brand-subtitle">Every Cup. Every Moment.</p>
          </div>
          <p className="footer-brand-desc">
            Serving freshly brewed tea, delicious snacks, and warm hospitality. Every visit is crafted to make your day brighter.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col footer-links-col-new">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links-list">
            <li><a href="#home" className="footer-link-new">Home</a></li>
            <li><a href="#collection" className="footer-link-new">Menu</a></li>
            <li><a href="#philosophy" className="footer-link-new">About Us</a></li>
            <li><a href="#visit" className="footer-link-new">Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="footer-col footer-contact-col-new">
          <h4 className="footer-col-title">Contact</h4>
          <ul className="footer-contact-list-new">
            <li>
              <span className="contact-label-new">Phone</span>
              <a href="tel:+919989131798" className="footer-contact-value-link">9989131798</a>
            </li>
            <li>
              <span className="contact-label-new">WhatsApp</span>
              <a 
                href="https://wa.me/919989131798" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-contact-value-link"
              >
                9989131798
              </a>
            </li>
            <li>
              <span className="contact-label-new">Email</span>
              <span className="contact-placeholder-new">coming soon</span>
            </li>
            <li>
              <span className="contact-label-new">Location</span>
              <a 
                href="https://maps.app.goo.gl/fY7LhxyLcu2B5zex9?g_st=aw" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-contact-value-link"
              >
                Open in Google Maps
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Opening Hours & CTA */}
        <div className="footer-col footer-hours-col-new">
          <h4 className="footer-col-title">Opening Hours</h4>
          <div className="footer-hours-content">
            <p className="hours-days-new">Monday – Sunday</p>
            <p className="hours-label-new">5:00 AM – 10:00 PM</p>
          </div>
          <div className="footer-cta-wrapper">
            <a 
              href="https://wa.me/919989131798?text=Hi%20Funny%20Tea!%20I%20would%20like%20to%20place%20an%20order." 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-cta-link-btn"
            >
              <Button variant="primary">
                Order on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-new">
        <div className="container footer-bottom-container-new">
          <div className="footer-divider-new"></div>
          <div className="footer-bottom-content-new">
            <p className="footer-copy-text">
              &copy;&nbsp;{currentYear} Funny Tea. Every Cup. Every Moment.
            </p>
            <p className="footer-credit-text">
              Designed & Developed with ❤️ by <a href="https://wa.me/916304024077?text=Hi%20Vision2Value!%20%F0%9F%91%8B%0A%0AI%20visited%20the%20Funny%20Tea%20website%20and%20really%20liked%20the%20design%20and%20user%20experience.%0A%0AI'm%20interested%20in%20your%20website%20design%20and%20development%20services%20for%20my%20business.%0A%0APlease%20share%20more%20details%20about%20your%20services%2C%20pricing%2C%20and%20how%20we%20can%20get%20started.%0A%0AThank%20you!" target="_blank" rel="noopener noreferrer" className="credit-highlight">Vision2Value</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
