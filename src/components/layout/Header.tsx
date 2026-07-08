import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

const WHATSAPP_URL = `https://wa.me/919989131798?text=${encodeURIComponent(
  "Hi Funny Tea! 👋\n\nI visited your website and would like to place an order.\n\nPlease share today's menu and availability.\n\nThank you!"
)}`;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background body scroll when mobile menu drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#collection' },
    { label: 'Gallery', href: '#experience' },
    { label: 'About Us', href: '#philosophy' },
    { label: 'Contact', href: '#visit' }
  ];

  return (
    <header className={`header ${isScrolled ? 'header-scrolled glass-effect' : ''}`}>
      <div className="container header-container">
        <a href="#home" className="logo" aria-label="Funny Tea Home">
          <img src="/images/logo/funny-tea-logo.png" alt="Funny Tea Logo" className="logo-img" />
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary header-cta">
            Order on WhatsApp
          </a>
          
          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer-wrapper ${isMobileMenuOpen ? 'mobile-drawer-open' : ''}`}>
        <div className="mobile-drawer-backdrop" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="mobile-drawer-panel">
          <div className="mobile-drawer-header">
            <a href="#home" className="mobile-drawer-logo" onClick={() => setIsMobileMenuOpen(false)} aria-label="Funny Tea Home">
              <img src="/images/logo/funny-tea-logo.png" alt="Funny Tea Logo" className="mobile-drawer-logo-img" />
            </a>
            <button
              className="mobile-drawer-close-btn"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close Navigation Menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="mobile-drawer-nav">
            <ul className="mobile-drawer-links">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="mobile-drawer-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mobile-drawer-footer">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mobile-drawer-cta"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
