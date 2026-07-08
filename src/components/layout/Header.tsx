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
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'mobile-drawer-open' : ''}`}>
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mobile-cta"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Order on WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
