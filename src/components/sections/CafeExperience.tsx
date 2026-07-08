import { useRef, useState, useEffect } from 'react';
import './CafeExperience.css';

export default function CafeExperience() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const experiences = [
    {
      title: 'Artisanal Clay Vessels',
      detail: 'Our teas are served in hand-thrown clay cups selected to enrich mineral character and retain gentle heat.'
    },
    {
      title: 'Tasting Ritual Flights',
      detail: 'Book an interactive flight at the tea bar, guided by our staff to compare oxidized profiles and harvests.'
    },
    {
      title: 'Acoustic Calm Serenity',
      detail: 'Our space features acoustic wood panels, soft linen textures, and no loud machinery to preserve quiet dialogue.'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
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
    <section ref={sectionRef} className="experience-section" id="experience">
      <div className="container experience-grid">
        {/* Left: Text Info */}
        <div className="experience-content">
          <span className="badge badge-green">The Café Experience</span>
          <h2 className="experience-title">More Than Tea, It's an Experience.</h2>
          <p className="experience-lead">
            Step into Funny Tea and enjoy the aroma of freshly brewed tea, delicious snacks, and a warm atmosphere where every visit feels relaxing and memorable.
          </p>

          <div className="experience-items">
            {experiences.map((exp, i) => (
              <div className="experience-item" key={i}>
                <h3 className="experience-item-title">
                  <span className="item-number">0{i + 1}.</span> {exp.title}
                </h3>
                <p className="experience-item-detail">{exp.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Premium Visual Video */}
        <div className="experience-visual">
          <div className="experience-image-wrapper">
            {isVisible ? (
              <video 
                src="/videos/cafe-experience.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="experience-video"
              />
            ) : (
              <div className="experience-video-placeholder"></div>
            )}
            <div className="floating-experience-tag glass-effect">
              <span className="experience-tag-title">Funny Tea Lounge</span>
              <span className="experience-tag-desc">Artisanal District, Ste. 102</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
