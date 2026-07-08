import { useState, useRef, useEffect } from 'react';
import Card from '../ui/Card';
import './FeaturedCollection.css';

interface TeaItem {
  title: string;
  category: 'tea' | 'snacks' | 'cookies';
  badge?: string;
  badgeType?: 'default' | 'green';
  subtitle: string;
  description: string;
  imageUrl?: string;
  isHotTea?: boolean;
}

export default function FeaturedCollection() {
  const [activeTab, setActiveTab] = useState<'all' | 'tea' | 'snacks' | 'cookies'>('all');
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<HTMLDivElement>(null);

  const teaCollection: TeaItem[] = [
    {
      title: 'Masala Tea',
      category: 'tea',
      badge: 'Best Seller',
      badgeType: 'default',
      subtitle: 'Spiced Milk Tea',
      description: 'A comforting blend of strong black tea infused with aromatic Indian spices like cardamom, ginger, and cloves, slow-brewed with fresh milk.',
      imageUrl: '/images/logo/products/masala-tea.webp',
      isHotTea: true
    },
    {
      title: 'Ginger Tea',
      category: 'tea',
      badge: 'Hot Favorite',
      badgeType: 'default',
      subtitle: 'Infused Black Tea',
      description: 'Warm, spicy, and refreshing black tea brewed with fresh crushed ginger root and creamy milk. Perfect for any time of the day.',
      imageUrl: '/images/logo/products/ginger-tea.webp',
      isHotTea: true
    },
    {
      title: 'Green Tea',
      category: 'tea',
      badge: 'Freshly Made',
      badgeType: 'green',
      subtitle: 'Antioxidant Green',
      description: 'Light and clean organic green tea leaves, carefully steeped to offer a gentle, antioxidant-rich flavor with subtle grassy notes.',
      imageUrl: '/images/logo/products/green-tea.webp',
      isHotTea: true
    },
    {
      title: 'Lemon Tea',
      category: 'tea',
      badge: 'New',
      badgeType: 'green',
      subtitle: 'Zesty Infusion',
      description: 'A zesty and uplifting black tea brewed with fresh lemon juice and a hint of honey, serving a bright, tangy experience.',
      imageUrl: '/images/logo/products/lemon-tea.webp',
      isHotTea: true
    },
    {
      title: 'Pista Tea',
      category: 'tea',
      badge: 'Signature',
      badgeType: 'green',
      subtitle: 'Nutty Saffron Brew',
      description: 'A premium signature blend of rich milk tea slow-brewed with the nutty warmth of ground pistachios and premium saffron.',
      imageUrl: '/images/logo/products/pista-tea.webp',
      isHotTea: true
    },
    {
      title: 'Coffee',
      category: 'tea',
      badge: 'Best Seller',
      badgeType: 'default',
      subtitle: 'Chicory Blend',
      description: 'Classic milk coffee brewed to perfection with premium roasted chicory-blend coffee beans for a rich, aromatic start to your day.',
      imageUrl: '/images/logo/products/coffee.webp',
      isHotTea: true
    },
    {
      title: 'Black Coffee',
      category: 'tea',
      badge: 'New',
      badgeType: 'green',
      subtitle: 'Pure Roast Espresso',
      description: 'A bold, rich espresso shot or drip-brew with deep roasted undertones and a smooth finish, served clean without milk.',
      imageUrl: '/images/logo/products/black-coffee.webp',
      isHotTea: true
    },
    {
      title: 'Mini Samosa',
      category: 'snacks',
      badge: 'Hot Favorite',
      badgeType: 'default',
      subtitle: 'Crispy Potato Pastry',
      description: 'Crispy, golden-fried bite-sized triangular pastries filled with a delicious spiced potato and green peas stuffing.',
      imageUrl: '/images/logo/products/mini-samosa.webp'
    },
    {
      title: 'Chicken Puff',
      category: 'snacks',
      badge: 'Best Seller',
      badgeType: 'default',
      subtitle: 'Spiced Chicken Pastry',
      description: 'Flaky, buttery puff pastry layers filled with a savory, spiced minced chicken masala cooked to perfection.',
      imageUrl: '/images/logo/products/chicken-puff.webp'
    },
    {
      title: 'Egg Puff',
      category: 'snacks',
      badge: 'Freshly Made',
      badgeType: 'green',
      subtitle: 'Classic Egg Pastry',
      description: 'A timeless bakery classic featuring half a boiled egg wrapped in crispy, golden-brown puff pastry with mild spices.',
      imageUrl: '/images/logo/products/egg-puff.webp'
    },
    {
      title: 'Curry Puff',
      category: 'snacks',
      badge: 'New',
      badgeType: 'green',
      subtitle: 'Veg Masala Pastry',
      description: 'A delicious puff pastry shell loaded with a spicy mixed vegetable curry, baked until golden and flaky.',
      imageUrl: '/images/logo/products/curry-puff.webp'
    },
    {
      title: 'Cookies',
      category: 'cookies',
      badge: 'Freshly Made',
      badgeType: 'green',
      subtitle: 'Bakery Biscuit',
      description: 'Deliciously baked sweet cookies with a crunchy texture, perfect for dipping into your hot tea or coffee.',
      imageUrl: '/images/logo/products/cookies.webp'
    },
    {
      title: 'Cake Rusk',
      category: 'cookies',
      badge: 'Hot Favorite',
      badgeType: 'default',
      subtitle: 'Double-Baked Slice',
      description: 'Double-baked sweet cake slices with a perfect crispy crunch, an iconic and classic companion for afternoon tea.',
      imageUrl: '/images/logo/products/cake-rusk.webp'
    },
    {
      title: 'Badam Biscuit',
      category: 'cookies',
      badge: 'Signature',
      badgeType: 'green',
      subtitle: 'Almond Butter Biscuit',
      description: 'Rich, melt-in-your-mouth butter biscuits loaded with crunchy almond bits and a hint of cardamom aroma.',
      imageUrl: '/images/logo/products/badam-biscuit.webp'
    },
    {
      title: 'Cheese Biscuit',
      category: 'cookies',
      badge: 'New',
      badgeType: 'green',
      subtitle: 'Cheddar Savory Biscuit',
      description: 'Savory, buttery biscuits baked with real cheddar cheese for a delightful salty-sweet snack experience.',
      imageUrl: '/images/logo/products/cheese-biscuit.webp'
    },
    {
      title: 'Salt Biscuit',
      category: 'cookies',
      badge: 'Freshly Made',
      badgeType: 'green',
      subtitle: 'Sprinkled Sea Salt',
      description: 'Crisp and buttery biscuits sprinkled with just the right amount of fine sea salt to balance your sweet tea.',
      imageUrl: '/images/logo/products/salt-biscuit.webp'
    },
    {
      title: 'Zeera Biscuit',
      category: 'cookies',
      badge: 'Best Seller',
      badgeType: 'default',
      subtitle: 'Roasted Cumin Biscuit',
      description: 'Delightfully crispy and savory bakery biscuits flavored with aromatic toasted cumin seeds.',
      imageUrl: '/images/logo/products/zeera-biscuit.webp'
    },
    {
      title: 'Husminaya Biscuit',
      category: 'cookies',
      badge: '⭐ House Favorite',
      badgeType: 'default',
      subtitle: 'Traditional Crispy Biscuit',
      description: 'Traditional crispy biscuit with a rich homemade taste, perfectly paired with a hot cup of tea.',
      imageUrl: '/images/logo/products/husminaya- biscuit.webp'
    }
  ];

  const filteredTeas = activeTab === 'all' 
    ? teaCollection 
    : teaCollection.filter(tea => tea.category === activeTab);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'tea', label: 'Tea' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'cookies', label: 'Cookies' }
  ] as const;

  useEffect(() => {
    const updateSlider = () => {
      const activeBtn = tabsRef.current?.querySelector('.tab-btn-active') as HTMLButtonElement;
      if (activeBtn) {
        setSliderStyle({
          left: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth
        });
      }
    };
    updateSlider();
    window.addEventListener('resize', updateSlider);
    return () => window.removeEventListener('resize', updateSlider);
  }, [activeTab]);

  return (
    <section className="collection-section" id="collection">
      <div className="container">
        <div className="collection-header flex-center">
          <span className="badge badge-green">The Collection</span>
          <h2 className="collection-title">Sip slow, explore deep.</h2>
          <p className="collection-lead">
            A small, curated selection of our finest teas and delicacies. Every offering represents whole-leaf organic crops brewed with precision at our café bar.
          </p>
        </div>

        <div className="collection-tabs-container">
          <div ref={tabsRef} className="collection-tabs glass-effect">
            <span 
              className="tabs-slider" 
              style={{ 
                transform: `translateX(${sliderStyle.left}px)`, 
                width: `${sliderStyle.width}px` 
              }}
            ></span>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'tab-btn-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="collection-grid">
          {filteredTeas.map((tea) => (
            <Card
              key={tea.title}
              title={tea.title}
              subtitle={tea.subtitle}
              description={tea.description}
              badge={tea.badge}
              badgeType={tea.badgeType}
              imageUrl={tea.imageUrl}
              isHotTea={tea.isHotTea}
              className="collection-card animate-fade-in"
              footer={
                <div className="tea-card-footer">
                  <span className="tea-serving">{tea.category === 'tea' ? 'Served hot / iced' : 'Freshly baked / ready'}</span>
                  <a 
                    href={`https://wa.me/919989131798?text=${encodeURIComponent(
                      `Hi Funny Tea! 👋\n\nI would like to order:\n\n${
                        tea.category === 'tea' ? '☕' : tea.category === 'snacks' ? '🥟' : '🍪'
                      } ${tea.title}\n\nPlease let me know the price and availability.`
                    )}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="tea-action-link"
                  >
                    Order on WhatsApp
                  </a>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
