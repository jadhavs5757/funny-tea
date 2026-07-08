import { useRef, useState, useEffect, type ReactNode } from 'react';
import { Phone, MessageSquare, Clock, MapPin } from 'lucide-react';
import './InfoSection.css';

export default function InfoSection() {
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

  const cards: Array<{
    icon: ReactNode;
    title: string;
    value: string;
    desc: string;
    link: string | null;
    isExternal: boolean;
    customFooter?: ReactNode;
  }> = [
    {
      icon: <Phone className="contact-card-icon" size={28} />,
      title: 'Phone Number',
      value: '9989131798',
      desc: 'Call us anytime during business hours.',
      link: 'tel:+919989131798',
      isExternal: false
    },
    {
      icon: <MessageSquare className="contact-card-icon" size={28} />,
      title: 'WhatsApp',
      value: '9989131798',
      desc: 'Chat with us directly to place your order.',
      link: 'https://wa.me/919989131798',
      isExternal: true
    },
    {
      icon: <Clock className="contact-card-icon" size={28} />,
      title: 'Opening Hours',
      value: 'Monday – Sunday',
      desc: '5:00 AM – 10:00 PM',
      link: null,
      isExternal: false
    },
    {
      icon: <MapPin className="contact-card-icon" size={28} />,
      title: 'Location',
      value: 'Tap below to open Google Maps.',
      desc: '',
      link: null,
      isExternal: false,
      customFooter: (
        <a 
          href="https://maps.app.goo.gl/fY7LhxyLcu2B5zex9?g_st=aw" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="location-maps-link"
        >
          📍 Open in Google Maps
        </a>
      )
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className={`contact-section ${isVisible ? 'animate-in' : ''}`} 
      id="visit"
    >
      <div className="container contact-container">
        {/* Section Header */}
        <div className="contact-header text-center">
          <span className="badge badge-green">Get in Touch</span>
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">
            Have a question or want to place an order? We're just one message away and always happy to serve you.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="contact-cards-grid">
          {cards.map((card, index) => {
            const CardElement = card.link ? 'a' : 'div';
            const extraProps = card.link 
              ? {
                  href: card.link,
                  ...(card.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})
                }
              : {};

            return (
              <CardElement
                key={index}
                className={`contact-card glass-effect ${card.link ? 'contact-card-interactive' : ''}`}
                {...extraProps}
              >
                <div className="contact-card-icon-wrapper">
                  {card.icon}
                </div>
                <h3 className="contact-card-title">{card.title}</h3>
                <p className="contact-card-value">{card.value}</p>
                {card.desc && <p className="contact-card-desc">{card.desc}</p>}
                {card.customFooter}
              </CardElement>
            );
          })}
        </div>
      </div>
    </section>
  );
}
