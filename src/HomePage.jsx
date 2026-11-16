import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { getWishlist, toggleWishlistItem, openWishlistDrawer } from './wishlistState.js';
import '../style.css';

const imageUrls = import.meta.glob('../img/*', { eager: true, query: '?url', import: 'default' });
const girlBagUrls = import.meta.glob('../girl-bag/*', { eager: true, query: '?url', import: 'default' });
const bannerUrls = {
  'banner1.png': new URL('../banner1.png', import.meta.url).href,
  'banner2.png': new URL('../banner2.png', import.meta.url).href,
  'banner3.png': new URL('../banner3.png', import.meta.url).href,
  'banner4.png': new URL('../banner4.png', import.meta.url).href,
};

function assetUrl(path) {
  if (!path) return '';
  const clean = path.replace(/^\.\//, '').replace(/^\//, '');
  const filename = clean.split('/').pop();
  return (
    bannerUrls[clean] ||
    girlBagUrls['../' + clean] ||
    imageUrls['../' + clean] ||
    girlBagUrls['../girl-bag/' + filename] ||
    imageUrls['../img/' + filename] ||
    clean
  );
}

export default function HomePage({ navigate }) {
  const popularTrackRef = useRef(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [wishlistItems, setWishlistItems] = useState(() => getWishlist());

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e && e.detail) setWishlistItems(e.detail);
      else setWishlistItems(getWishlist());
    };
    window.addEventListener('dg_wishlist_updated', handleUpdate);
    return () => window.removeEventListener('dg_wishlist_updated', handleUpdate);
  }, []);

  const handleHeartClick = (e, product) => {
    e.stopPropagation();
    toggleWishlistItem(product);
  };

  const isSaved = (title) => wishlistItems.some((it) => it.title === title);

  const openQuickView = (image, title, meta = {}) => {
    setQuickViewProduct({
      image,
      title: title || 'Handcrafted Luxury Bag',
      category: meta.category || 'Luxury Collection',
      itemCode: meta.itemCode || 'DGF-EXP',
      moq: meta.moq || '50 - 100 Pcs',
      leadTime: meta.leadTime || '15 - 20 Business Days',
      dimensions: meta.dimensions || 'Custom Size Specifications Available',
      sampling: meta.sampling || '3 - 5 Days with OEM Brand Logo',
      material: meta.material || 'Artisan Textile / Export Grade PU / Metal Trim',
      description: meta.description || 'Precision handcrafted luxury piece manufactured for export and boutique retail. Direct manufacturer quality from Pilkhuwa.',
      colors: meta.colors || ['#171815', '#c69d57', '#d9cbb8', '#4a6b5c'],
      colorNames: meta.colorNames || ['Jet Black', 'Champagne Gold', 'Oatmeal Beige', 'Emerald Forest'],
    });
    setSelectedColorIndex(0);
  };

  const handleWhatsAppInquiry = (product) => {
    const text = `Hello D Galore Fashion / TN Enterprises Team!\n\nI am interested in receiving a B2B export quotation for this product from your website:\n\n• Product: ${product.title}\n• Category: ${product.category}\n• Item Code: ${product.itemCode}\n• MOQ: ${product.moq}\n\nPlease share price lists, FOB terms, and sample availability. Thank you!`;
    const url = `https://wa.me/919999920003?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    if (quickViewProduct) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setQuickViewProduct(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [quickViewProduct]);

  useEffect(() => {
    window.__hpOpenQuickView = (imgSrc, title, extra) => {
      openQuickView(imgSrc, title, extra);
    };
    window.openModal = (imgSrc, title) => {
      openQuickView(imgSrc, title);
    };
    return () => {
      delete window.__hpOpenQuickView;
      document.body.style.overflow = '';
    };
  }, []);

  const styleSlideLabels = ['CASUAL', 'WORK', 'EVENING', 'WEEKEND', 'PARTY', 'TRAVEL'];

  const styleLooks = [
    {
      idx: 0,
      label: 'CASUAL',
      title: 'Casual Look',
      desc: 'Easy, breezy and effortlessly chic.',
      img: 'girl-bag/WhatsApp Image 2026-08-12 at 1.40.45 PM (8).jpeg',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1={6} y1={1} x2={6} y2={4} />
          <line x1={10} y1={1} x2={10} y2={4} />
          <line x1={14} y1={1} x2={14} y2={4} />
        </svg>
      ),
    },
    {
      idx: 1,
      label: 'WORK',
      title: 'Work Look',
      desc: 'Smart, sophisticated and ready for the day.',
      img: 'girl-bag/WhatsApp Image 2026-08-12 at 1.40.46 PM (8).jpeg',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
          <rect x={2} y={7} width={20} height={14} rx={2} ry={2} />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
    },
    {
      idx: 2,
      label: 'EVENING',
      title: 'Evening Look',
      desc: 'Bold, elegant and made to stand out.',
      img: 'girl-bag/WhatsApp Image 2026-08-12 at 1.40.46 PM (9).jpeg',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
          <path d="M8 22l4-10 4 10" />
          <path d="M12 12V2" />
          <path d="M5 2h14l-7 10z" />
        </svg>
      ),
    },
    {
      idx: 3,
      label: 'WEEKEND',
      title: 'Weekend Brunch',
      desc: 'Playful, relaxed and full of sunny charm.',
      img: 'girl-bag/WhatsApp Image 2026-08-12 at 1.40.45 PM (2).jpeg',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
          <circle cx={12} cy={12} r={5} />
          <line x1={12} y1={1} x2={12} y2={3} />
          <line x1={12} y1={21} x2={12} y2={23} />
          <line x1={4.22} y1={4.22} x2={5.64} y2={5.64} />
          <line x1={18.36} y1={18.36} x2={19.78} y2={19.78} />
          <line x1={1} y1={12} x2={3} y2={12} />
          <line x1={21} y1={12} x2={23} y2={12} />
          <line x1={4.22} y1={19.78} x2={5.64} y2={18.36} />
          <line x1={18.36} y1={5.64} x2={19.78} y2={4.22} />
        </svg>
      ),
    },
    {
      idx: 4,
      label: 'PARTY',
      title: 'Party Glamour',
      desc: 'Dazzling handcrafted accents for celebrations.',
      img: 'girl-bag/WhatsApp Image 2026-08-12 at 1.40.46 PM (2).jpeg',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      idx: 5,
      label: 'TRAVEL',
      title: 'Chic Travel',
      desc: 'Effortless luxury designed for your journeys.',
      img: 'girl-bag/WhatsApp Image 2026-08-12 at 1.40.45 PM (1).jpeg',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
          <circle cx={12} cy={12} r={10} />
          <line x1={2} y1={12} x2={22} y2={12} />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
  ];

  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [sliderPaused, setSliderPaused] = useState(false);
  const touchStartRef = useRef(null);

  const [lifestyleCounts, setLifestyleCounts] = useState({ legacy: 0, styles: 0, global: 0 });
  const [lifestyleAnimated, setLifestyleAnimated] = useState(false);
  const lifestyleRef = useRef(null);

  useEffect(() => {
    const el = lifestyleRef.current;
    if (!el) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLifestyleCounts({ legacy: 40, styles: 500, global: 30 });
      setLifestyleAnimated(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !lifestyleAnimated) {
            setLifestyleAnimated(true);
            observer.unobserve(entry.target);

            const duration = 2000;
            let startTime = null;

            const animate = (timestamp) => {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 3);

              setLifestyleCounts({
                legacy: Math.floor(ease * 40),
                styles: Math.floor(ease * 500),
                global: Math.floor(ease * 30),
              });

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setLifestyleCounts({ legacy: 40, styles: 500, global: 30 });
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [lifestyleAnimated]);

  const desktopOffset = Math.max(
    0,
    Math.min(activeLookIndex > 1 ? activeLookIndex - 1 : 0, Math.max(0, styleLooks.length - 3))
  );

  const slideNext = () => {
    setActiveLookIndex((prev) => (prev + 1) % styleLooks.length);
  };

  const slidePrev = () => {
    setActiveLookIndex((prev) => (prev - 1 + styleLooks.length) % styleLooks.length);
  };

  const goToLook = (targetIdx) => {
    setActiveLookIndex(targetIdx);
  };

  useEffect(() => {
    if (sliderPaused) return undefined;
    const timer = setInterval(() => {
      setActiveLookIndex((prev) => (prev + 1) % styleLooks.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [sliderPaused, styleLooks.length]);

  useEffect(() => {
    import('../script.js').catch((error) => {
      console.error('Failed to load page interactions:', error);
    });

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      return;
    }

    const revealTargets = document.querySelectorAll(
      '.shop-category, .our-story-section, .new-arrivals, .best-sellers-banner, ' +
      '.popular-products, .craftsmanship-section, .style-ways-section, .lifestyle-modern, .newsletter, .footer',
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    revealTargets.forEach((target) => {
      target.classList.add('scroll-reveal');
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = popularTrackRef.current;
    if (!track || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer;
    const advance = () => {
      const card = track.querySelector('.grid-item');
      if (!card) return;
      const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 0);
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - step / 2;
      track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step, behavior: 'smooth' });
    };
    const start = () => { timer = window.setInterval(advance, 3600); };
    const stop = () => window.clearInterval(timer);
    start();
    track.addEventListener('mouseenter', stop);
    track.addEventListener('mouseleave', start);
    track.addEventListener('focusin', stop);
    track.addEventListener('focusout', start);
    return () => {
      stop();
      track.removeEventListener('mouseenter', stop);
      track.removeEventListener('mouseleave', start);
      track.removeEventListener('focusin', stop);
      track.removeEventListener('focusout', start);
    };
  }, []);

  return (
    <>
      <div>
        {/* Header & Top Bar */}
        <Header activePage="home" navigate={navigate} />
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-slide active">
            <img src={assetUrl("banner1.png")} alt="Hero Banner 1" className="hero-img slide-img" />
            <div className="hero-left">
              <div className="hero-content">
                <div className="hero-eyebrow">NEW COLLECTION</div>
                <h1 className="hero-title">Where Luxury<br />Meets You</h1>
                <p className="hero-desc">Discover timeless handbags crafted with premium materials for the modern you.</p>
                <a href="#" className="btn btn-gold">SHOP THE COLLECTION →</a>
                <div className="hero-features">
                  <div className="hf-item"><svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <circle cx={12} cy={12} r={10} />
                    <path d="M12 6v6l4 2" />
                  </svg> <span>Premium<br />Quality</span></div>
                  <div className="hf-item"><svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                    </path>
                  </svg> <span>Handcrafted<br />With Love</span></div>
                  <div className="hf-item"><svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <path d="M12 2l3 6 6 1-4.5 4.5 1 6-5.5-3-5.5 3 1-6L3 9l6-1 3-6z" />
                  </svg> <span>Trendy<br />Designs</span></div>
                  <div className="hf-item"><svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
                    <line x1={1} y1={10} x2={23} y2={10} />
                  </svg> <span>Secure<br />Payments</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-slide">
            <img src={assetUrl("banner2.png")} alt="Hero Banner 2" className="hero-img slide-img" />
            <div className="hero-left">
              <div className="hero-content">
                <div className="hero-eyebrow">TRENDING NOW</div>
                <h1 className="hero-title">Elevate Your<br />Everyday Style</h1>
                <p className="hero-desc">Explore our latest arrivals designed to make a statement wherever you go.</p>
                <a href="#" className="btn btn-gold">EXPLORE NEW ARRIVALS →</a>
                <div className="hero-features">
                  <div className="hf-item"><svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <circle cx={12} cy={12} r={10} />
                    <path d="M12 6v6l4 2" />
                  </svg> <span>Premium<br />Quality</span></div>
                  <div className="hf-item"><svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                    </path>
                  </svg> <span>Handcrafted<br />With Love</span></div>
                  <div className="hf-item"><svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <path d="M12 2l3 6 6 1-4.5 4.5 1 6-5.5-3-5.5 3 1-6L3 9l6-1 3-6z" />
                  </svg> <span>Trendy<br />Designs</span></div>
                  <div className="hf-item"><svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
                    <line x1={1} y1={10} x2={23} y2={10} />
                  </svg> <span>Secure<br />Payments</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-slide">
            <img src={assetUrl("banner3.png")} alt="Hero Banner 3" className="hero-img slide-img" />
            <div className="hero-left">
              <div className="hero-content">
                <div className="hero-eyebrow">LIMITED EDITION</div>
                <h1 className="hero-title">Exquisite Craft<br />Signature Look</h1>
                <p className="hero-desc">Handcrafted perfection that speaks volumes. Grab them before they're gone.</p>
                <a href="#" className="btn btn-gold">SHOP LIMITED EDITION →</a>
                <div className="hero-features">
                  <div className="hf-item"><svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <circle cx={12} cy={12} r={10} />
                    <path d="M12 6v6l4 2" />
                  </svg> <span>Premium<br />Quality</span></div>
                  <div className="hf-item"><svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                    </path>
                  </svg> <span>Handcrafted<br />With Love</span></div>
                  <div className="hf-item"><svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <path d="M12 2l3 6 6 1-4.5 4.5 1 6-5.5-3-5.5 3 1-6L3 9l6-1 3-6z" />
                  </svg> <span>Trendy<br />Designs</span></div>
                  <div className="hf-item"><svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
                    <line x1={1} y1={10} x2={23} y2={10} />
                  </svg> <span>Secure<br />Payments</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-slide">
            <img src={assetUrl("banner4.png")} alt="Hero Banner 4" className="hero-img slide-img" />
            <div className="hero-left">
              <div className="hero-content">
                <div className="hero-eyebrow">EVENING COUTURE</div>
                <h1 className="hero-title">Glamour In<br />Every Detail</h1>
                <p className="hero-desc">Artisanal clutches and statement evening bags handcrafted to shine with you.</p>
                <a href="#" className="btn btn-gold">DISCOVER EVENING BAGS →</a>
                <div className="hero-features">
                  <div className="hf-item"><svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <circle cx={12} cy={12} r={10} />
                    <path d="M12 6v6l4 2" />
                  </svg> <span>Premium<br />Quality</span></div>
                  <div className="hf-item"><svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                    </path>
                  </svg> <span>Handcrafted<br />With Love</span></div>
                  <div className="hf-item"><svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <path d="M12 2l3 6 6 1-4.5 4.5 1 6-5.5-3-5.5 3 1-6L3 9l6-1 3-6z" />
                  </svg> <span>Trendy<br />Designs</span></div>
                  <div className="hf-item"><svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
                    <line x1={1} y1={10} x2={23} y2={10} />
                  </svg> <span>Secure<br />Payments</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-nav prev"><svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M15 18l-6-6 6-6" />
          </svg></div>
          <div className="hero-nav next"><svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M9 18l6-6-6-6" />
          </svg></div>
          <div className="hero-pagination" id="heroProgress">
            <span id="currentSlideNum">01</span>
            <div className="progress-bar">
              <div className="progress-fill" id="heroProgressFill" />
            </div>
            <span>04</span>
          </div>
        </section>
        {/* Shop By Category */}
        <section className="shop-category">
          <div className="section-header category-header">
            <h2>- SHOP BY CATEGORY -</h2>
            <div className="header-divider-gold">
              <svg width={120} height={10} viewBox="0 0 120 10">
                <line x1={0} y1={5} x2={52} y2={5} stroke="#c69d57" strokeWidth="1.5" />
                <rect x="56.5" y="1.5" width={7} height={7} fill="#c69d57" transform="rotate(45 60 5)" />
                <line x1={68} y1={5} x2={120} y2={5} stroke="#c69d57" strokeWidth="1.5" />
              </svg>
            </div>
            <button
              type="button"
              className="view-all-link"
              onClick={() => navigate('/product')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit' }}
            >
              View All Collections →
            </button>
          </div>
          <div className="category-grid">
            <div
              className="category-item"
              style={{ cursor: 'pointer' }}
              onClick={() => openQuickView(
                assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.28 PM (2).jpeg"),
                "TOTE BAGS",
                { category: "Tote Bags", itemCode: "DGF-CAT-TB", moq: "50 Pcs", material: "Handcrafted Canvas & Vegan Leather Trims" }
              )}
            >
              <div className="cat-img-wrapper"><img src={assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.28 PM (2).jpeg")} alt="Tote Bags" /></div>
              <span>TOTE BAGS</span>
            </div>
            <div
              className="category-item"
              style={{ cursor: 'pointer' }}
              onClick={() => openQuickView(
                assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.28 PM (3).jpeg"),
                "SHOULDER BAGS",
                { category: "Shoulder Bags", itemCode: "DGF-CAT-SB", moq: "50 Pcs", material: "Structured Silhouette & Reinforced Straps" }
              )}
            >
              <div className="cat-img-wrapper"><img src={assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.28 PM (3).jpeg")} alt="Shoulder Bags" /></div>
              <span>SHOULDER BAGS</span>
            </div>
            <div
              className="category-item"
              style={{ cursor: 'pointer' }}
              onClick={() => openQuickView(
                assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (1).jpeg"),
                "SLING BAGS",
                { category: "Sling Bags", itemCode: "DGF-CAT-SL", moq: "60 Pcs", material: "Artisan Handcrafted Compact Crossbody" }
              )}
            >
              <div className="cat-img-wrapper"><img src={assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (1).jpeg")} alt="Sling Bags" /></div>
              <span>SLING BAGS</span>
            </div>
            <div
              className="category-item"
              style={{ cursor: 'pointer' }}
              onClick={() => openQuickView(
                assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (10).jpeg"),
                "CLUTCHES",
                { category: "Clutches & Evening", itemCode: "DGF-CAT-CL", moq: "40 Pcs", material: "Beaded Embroidery & Metallic Box Clasp" }
              )}
            >
              <div className="cat-img-wrapper"><img src={assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (10).jpeg")} alt="Clutches" /></div>
              <span>CLUTCHES</span>
            </div>
            <div
              className="category-item"
              style={{ cursor: 'pointer' }}
              onClick={() => openQuickView(
                assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (2).jpeg"),
                "SATCHELS",
                { category: "Satchels", itemCode: "DGF-CAT-ST", moq: "50 Pcs", material: "Tailored Architecture & Premium Hardware" }
              )}
            >
              <div className="cat-img-wrapper"><img src={assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (2).jpeg")} alt="Satchels" /></div>
              <span>SATCHELS</span>
            </div>
            <div
              className="category-item"
              style={{ cursor: 'pointer' }}
              onClick={() => openQuickView(
                assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (3).jpeg"),
                "WALLETS",
                { category: "Wallets & Accessories", itemCode: "DGF-CAT-WL", moq: "100 Pcs", material: "Genuine Leather & RFID Protected Lining" }
              )}
            >
              <div className="cat-img-wrapper"><img src={assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (3).jpeg")} alt="Wallets" /></div>
              <span>WALLETS</span>
            </div>
          </div>
        </section>
        {/* Our Story Section */}
        <section className="our-story-section">
          <div className="our-story-container">
            {/* Left Column: Image & Badge */}
            <div className="story-left">
              {/* Floral Background SVG */}
              <div className="floral-bg">
                <svg viewBox="0 0 200 400" fill="none" stroke="#e0d0b8" strokeWidth="1.5">
                  <path d="M50,400 Q40,300 80,200 Q120,100 150,50" />
                  <path d="M70,250 Q20,220 10,150 Q40,160 70,250" />
                  <path d="M75,230 Q100,180 140,160 Q110,210 75,230" />
                  <path d="M60,320 Q10,290 5,220 Q40,250 60,320" />
                  <path d="M80,150 Q50,90 40,30 Q80,70 80,150" />
                  <path d="M90,280 Q140,250 180,220 Q130,290 90,280" />
                </svg>
              </div>
              <div className="story-badge">
                <svg className="rotating-text" viewBox="0 0 100 100" width={130} height={130}>
                  <defs>
                    <path id="curve" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                  </defs>
                  <text fill="#c69d57" fontSize="10.5" fontWeight={600} letterSpacing="4.5">
                    <textPath href="#curve" startOffset="0%">
                      ELEGANCE • ELEGANCE •
                    </textPath>
                  </text>
                </svg>
                <div className="badge-center">
                  <span className="est">EST.</span>
                  <span className="year">1984</span>
                </div>
              </div>
              <div className="story-image-wrapper">
                <img src={assetUrl("img/54c38b87-b744-4a39-b369-03cc429abbc1.png")} alt="D Galore Fashion Bag" />
              </div>
            </div>
            {/* Center Column: Text Content */}
            <div className="story-center">
              <div className="story-star-top">
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#c69d57" stroke="none" />
                  <line x1={0} y1={12} x2={6} y2={12} stroke="#c69d57" strokeWidth={1} />
                  <line x1={18} y1={12} x2={24} y2={12} stroke="#c69d57" strokeWidth={1} />
                </svg>
              </div>
              <div className="story-eyebrow">ABOUT D GALORE FASHION</div>
              <h2 className="story-heading">Our Story</h2>
              <div className="story-star-divider">
                <svg width={12} height={12} viewBox="0 0 24 24" fill="#c69d57">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </div>
              <h3 className="story-subheading">Four Decades of Craft.<br />Made for the World.</h3>
              <p className="story-text">
                At D Galore Fashion Pvt. Ltd., we have built a four-decade family legacy of craftsmanship, trust, and quality.
                Since 1984, we have specialized in handcrafted beaded bags, evening bags, clutches, and lifestyle fashion
                accessories designed for global elegance.
              </p>
              <a href="/about" onClick={(e) => { e.preventDefault(); if (navigate) navigate('/about'); else window.location.href = '/about'; }} className="btn btn-dark btn-explore">EXPLORE OUR STORY →</a>
            </div>
            {/* Right Column: Features */}
            <div className="story-right">
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                      <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
                      <path d="M2 9h20" />
                      <path d="M12 21L6 9" />
                      <path d="M12 21l6-12" />
                      <path d="M6 3l6 6" />
                      <path d="M18 3l-6 6" />
                    </svg>
                  </div>
                  <div className="feature-content">
                    <h4>Premium Quality<br />Materials</h4>
                    <p>We use the finest materials to ensure durability and long-lasting beauty.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1={3} y1={6} x2={21} y2={6} />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <div className="feature-content">
                    <h4>Trendy &amp; Stylish<br />Designs</h4>
                    <p>Thoughtfully designed collections that keep you ahead of the trends.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>
                  </div>
                  <div className="feature-content">
                    <h4>Designed for<br />Modern Women</h4>
                    <p>Created for women who embrace their individuality and live with confidence.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                      </polygon>
                    </svg>
                  </div>
                  <div className="feature-content">
                    <h4>Affordable Luxury</h4>
                    <p>Experience the perfect blend of luxury and affordability.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* New Arrivals Slider */}
        <section className="new-arrivals">
          <div className="section-header modern-header">
            <div className="header-eyebrow">ELEGANCE • QUALITY • YOU</div>
            <div className="title-with-divider">
              <h2>NEW ARRIVALS</h2>
              <div className="diamond-divider">
                <svg width={100} height={12} viewBox="0 0 100 12">
                  <line x1={0} y1={6} x2={42} y2={6} stroke="#c69d57" strokeWidth={1} />
                  <rect x={47} y={3} width={6} height={6} fill="none" stroke="#c69d57" strokeWidth={1} transform="rotate(45 50 6)" />
                  <line x1={58} y1={6} x2={100} y2={6} stroke="#c69d57" strokeWidth={1} />
                </svg>
              </div>
            </div>
            <p className="subtitle italic-subtitle">Curated pieces for your everyday style</p>
            <button
              type="button"
              className="view-all-right"
              onClick={() => navigate('/product')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit' }}
            >
              VIEW ALL PRODUCTS →
            </button>
          </div>
          <div className="arrivals-carousel-container">
            <div className="arrivals-nav prev" id="arrPrev"><svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg></div>
            <div className="arrivals-track" id="arrivalsTrack">
              {/* Card 1 */}
              <div className="arrival-card prev-outer">
                <div
                  className={`card-heart ${isSaved('Floral Printed Tote') ? 'is-saved' : ''}`}
                  onClick={(e) =>
                    handleHeartClick(e, {
                      title: 'Floral Printed Tote',
                      imgSrc: assetUrl('img/WhatsApp Image 2026-08-12 at 1.39.29 PM (5).jpeg'),
                      category: 'New Arrivals',
                      itemCode: 'DGF-ARR-01',
                      moq: '50 Pcs'
                    })
                  }
                  title={isSaved('Floral Printed Tote') ? 'Remove from shortlist' : 'Save for Inquiry'}
                >
                  <svg viewBox="0 0 24 24" fill={isSaved('Floral Printed Tote') ? '#c69d57' : 'none'} stroke={isSaved('Floral Printed Tote') ? '#c69d57' : 'currentColor'} strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <div className="card-badge">NEW</div>
                <div
                  className="card-img"
                  style={{ cursor: 'pointer' }}
                  onClick={() => openQuickView(
                    assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (5).jpeg"),
                    "Floral Printed Tote",
                    { category: "New Arrivals", itemCode: "DGF-ARR-01", moq: "50 Pcs", material: "Artisan Screen-Printed Fabric & Vegan Trims" }
                  )}
                >
                  <img src={assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (5).jpeg")} alt="Bag" />
                </div>
                <div className="card-info">
                  <h4
                    className="product-name"
                    style={{ cursor: 'pointer' }}
                    onClick={() => openQuickView(
                      assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (5).jpeg"),
                      "Floral Printed Tote",
                      { category: "New Arrivals", itemCode: "DGF-ARR-01", moq: "50 Pcs", material: "Artisan Screen-Printed Fabric & Vegan Trims" }
                    )}
                  >
                    Floral Printed Tote
                  </h4>
                  <div className="price-row">
                    <div className="product-price">MOQ: 50 Pcs</div>
                    <div
                      className="plus-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={() => openQuickView(
                        assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (5).jpeg"),
                        "Floral Printed Tote",
                        { category: "New Arrivals", itemCode: "DGF-ARR-01", moq: "50 Pcs", material: "Artisan Screen-Printed Fabric & Vegan Trims" }
                      )}
                      title="Quick Specifications"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-dark btn-cart"
                    onClick={() => openQuickView(
                      assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (5).jpeg"),
                      "Floral Printed Tote",
                      { category: "New Arrivals", itemCode: "DGF-ARR-01", moq: "50 Pcs", material: "Artisan Screen-Printed Fabric & Vegan Trims" }
                    )}
                  >
                    QUICK VIEW / RFQ →
                  </button>
                </div>
              </div>
              {/* Card 2 */}
              <div className="arrival-card prev">
                <div
                  className={`card-heart ${isSaved('Colorful Sling Bag') ? 'is-saved' : ''}`}
                  onClick={(e) =>
                    handleHeartClick(e, {
                      title: 'Colorful Sling Bag',
                      imgSrc: assetUrl('img/WhatsApp Image 2026-08-12 at 1.39.29 PM (6).jpeg'),
                      category: 'New Arrivals',
                      itemCode: 'DGF-ARR-02',
                      moq: '50 Pcs'
                    })
                  }
                  title={isSaved('Colorful Sling Bag') ? 'Remove from shortlist' : 'Save for Inquiry'}
                >
                  <svg viewBox="0 0 24 24" fill={isSaved('Colorful Sling Bag') ? '#c69d57' : 'none'} stroke={isSaved('Colorful Sling Bag') ? '#c69d57' : 'currentColor'} strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <div className="card-badge">NEW</div>
                <div
                  className="card-img"
                  style={{ cursor: 'pointer' }}
                  onClick={() => openQuickView(
                    assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (6).jpeg"),
                    "Colorful Sling Bag",
                    { category: "New Arrivals", itemCode: "DGF-ARR-02", moq: "50 Pcs", material: "Hand-embossed Vivid Palette Crossbody" }
                  )}
                >
                  <img src={assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (6).jpeg")} alt="Bag" />
                </div>
                <div className="card-info">
                  <h4
                    className="product-name"
                    style={{ cursor: 'pointer' }}
                    onClick={() => openQuickView(
                      assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (6).jpeg"),
                      "Colorful Sling Bag",
                      { category: "New Arrivals", itemCode: "DGF-ARR-02", moq: "50 Pcs", material: "Hand-embossed Vivid Palette Crossbody" }
                    )}
                  >
                    Colorful Sling Bag
                  </h4>
                  <div className="price-row">
                    <div className="product-price">MOQ: 50 Pcs</div>
                    <div
                      className="plus-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={() => openQuickView(
                        assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (6).jpeg"),
                        "Colorful Sling Bag",
                        { category: "New Arrivals", itemCode: "DGF-ARR-02", moq: "50 Pcs", material: "Hand-embossed Vivid Palette Crossbody" }
                      )}
                      title="Quick Specifications"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-dark btn-cart"
                    onClick={() => openQuickView(
                      assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (6).jpeg"),
                      "Colorful Sling Bag",
                      { category: "New Arrivals", itemCode: "DGF-ARR-02", moq: "50 Pcs", material: "Hand-embossed Vivid Palette Crossbody" }
                    )}
                  >
                    QUICK VIEW / RFQ →
                  </button>
                </div>
              </div>
              {/* Card 3 (Active) */}
              <div className="arrival-card active">
                <div className="card-badge">NEW</div>
                <div
                  className={`card-heart ${isSaved('Premium Handbag') ? 'is-saved' : ''}`}
                  onClick={(e) =>
                    handleHeartClick(e, {
                      title: 'Premium Handbag',
                      imgSrc: assetUrl('img/WhatsApp Image 2026-08-12 at 1.39.29 PM (7).jpeg'),
                      category: 'New Arrivals',
                      itemCode: 'DGF-ARR-03',
                      moq: '40 Pcs'
                    })
                  }
                  title={isSaved('Premium Handbag') ? 'Remove from shortlist' : 'Save for Inquiry'}
                >
                  <svg viewBox="0 0 24 24" fill={isSaved('Premium Handbag') ? '#c69d57' : 'none'} stroke={isSaved('Premium Handbag') ? '#c69d57' : 'currentColor'} strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <div
                  className="card-img"
                  style={{ cursor: 'pointer' }}
                  onClick={() => openQuickView(
                    assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (7).jpeg"),
                    "Premium Handbag",
                    { category: "New Arrivals", itemCode: "DGF-ARR-03", moq: "40 Pcs", material: "Signature Structured Frame & Handcrafted Handle" }
                  )}
                >
                  <img src={assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (7).jpeg")} alt="Bag" />
                </div>
                <div className="card-info">
                  <h4
                    className="product-name"
                    style={{ cursor: 'pointer' }}
                    onClick={() => openQuickView(
                      assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (7).jpeg"),
                      "Premium Handbag",
                      { category: "New Arrivals", itemCode: "DGF-ARR-03", moq: "40 Pcs", material: "Signature Structured Frame & Handcrafted Handle" }
                    )}
                  >
                    Premium Handbag
                  </h4>
                  <div className="price-row">
                    <div className="product-price">MOQ: 40 Pcs</div>
                    <div
                      className="plus-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={() => openQuickView(
                        assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (7).jpeg"),
                        "Premium Handbag",
                        { category: "New Arrivals", itemCode: "DGF-ARR-03", moq: "40 Pcs", material: "Signature Structured Frame & Handcrafted Handle" }
                      )}
                      title="Quick Specifications"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-dark btn-cart"
                    onClick={() => openQuickView(
                      assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (7).jpeg"),
                      "Premium Handbag",
                      { category: "New Arrivals", itemCode: "DGF-ARR-03", moq: "40 Pcs", material: "Signature Structured Frame & Handcrafted Handle" }
                    )}
                  >
                    QUICK VIEW / RFQ →
                  </button>
                </div>
              </div>
              {/* Card 4 */}
              <div className="arrival-card next">
                <div
                  className={`card-heart ${isSaved('Trendy Shoulder Bag') ? 'is-saved' : ''}`}
                  onClick={(e) =>
                    handleHeartClick(e, {
                      title: 'Trendy Shoulder Bag',
                      imgSrc: assetUrl('img/WhatsApp Image 2026-08-12 at 1.39.29 PM (8).jpeg'),
                      category: 'New Arrivals',
                      itemCode: 'DGF-ARR-04',
                      moq: '60 Pcs'
                    })
                  }
                  title={isSaved('Trendy Shoulder Bag') ? 'Remove from shortlist' : 'Save for Inquiry'}
                >
                  <svg viewBox="0 0 24 24" fill={isSaved('Trendy Shoulder Bag') ? '#c69d57' : 'none'} stroke={isSaved('Trendy Shoulder Bag') ? '#c69d57' : 'currentColor'} strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <div className="card-badge">NEW</div>
                <div
                  className="card-img"
                  style={{ cursor: 'pointer' }}
                  onClick={() => openQuickView(
                    assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (8).jpeg"),
                    "Trendy Shoulder Bag",
                    { category: "New Arrivals", itemCode: "DGF-ARR-04", moq: "60 Pcs", material: "Ergonomic Shoulder Strap & High-density Stitching" }
                  )}
                >
                  <img src={assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (8).jpeg")} alt="Bag" />
                </div>
                <div className="card-info">
                  <h4
                    className="product-name"
                    style={{ cursor: 'pointer' }}
                    onClick={() => openQuickView(
                      assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (8).jpeg"),
                      "Trendy Shoulder Bag",
                      { category: "New Arrivals", itemCode: "DGF-ARR-04", moq: "60 Pcs", material: "Ergonomic Shoulder Strap & High-density Stitching" }
                    )}
                  >
                    Trendy Shoulder Bag
                  </h4>
                  <div className="price-row">
                    <div className="product-price">MOQ: 60 Pcs</div>
                    <div
                      className="plus-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={() => openQuickView(
                        assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (8).jpeg"),
                        "Trendy Shoulder Bag",
                        { category: "New Arrivals", itemCode: "DGF-ARR-04", moq: "60 Pcs", material: "Ergonomic Shoulder Strap & High-density Stitching" }
                      )}
                      title="Quick Specifications"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-dark btn-cart"
                    onClick={() => openQuickView(
                      assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (8).jpeg"),
                      "Trendy Shoulder Bag",
                      { category: "New Arrivals", itemCode: "DGF-ARR-04", moq: "60 Pcs", material: "Ergonomic Shoulder Strap & High-density Stitching" }
                    )}
                  >
                    QUICK VIEW / RFQ →
                  </button>
                </div>
              </div>
              {/* Card 5 */}
              <div className="arrival-card next-outer">
                <div
                  className={`card-heart ${isSaved('Green Printed Tote') ? 'is-saved' : ''}`}
                  onClick={(e) =>
                    handleHeartClick(e, {
                      title: 'Green Printed Tote',
                      imgSrc: assetUrl('img/WhatsApp Image 2026-08-12 at 1.39.29 PM (9).jpeg'),
                      category: 'New Arrivals',
                      itemCode: 'DGF-ARR-05',
                      moq: '50 Pcs'
                    })
                  }
                  title={isSaved('Green Printed Tote') ? 'Remove from shortlist' : 'Save for Inquiry'}
                >
                  <svg viewBox="0 0 24 24" fill={isSaved('Green Printed Tote') ? '#c69d57' : 'none'} stroke={isSaved('Green Printed Tote') ? '#c69d57' : 'currentColor'} strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <div className="card-badge">NEW</div>
                <div
                  className="card-img"
                  style={{ cursor: 'pointer' }}
                  onClick={() => openQuickView(
                    assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (9).jpeg"),
                    "Green Printed Tote",
                    { category: "New Arrivals", itemCode: "DGF-ARR-05", moq: "50 Pcs", material: "Botanical Motif Canvas & Double Reinforced Seams" }
                  )}
                >
                  <img src={assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (9).jpeg")} alt="Bag" />
                </div>
                <div className="card-info">
                  <h4
                    className="product-name"
                    style={{ cursor: 'pointer' }}
                    onClick={() => openQuickView(
                      assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (9).jpeg"),
                      "Green Printed Tote",
                      { category: "New Arrivals", itemCode: "DGF-ARR-05", moq: "50 Pcs", material: "Botanical Motif Canvas & Double Reinforced Seams" }
                    )}
                  >
                    Green Printed Tote
                  </h4>
                  <div className="price-row">
                    <div className="product-price">MOQ: 50 Pcs</div>
                    <div
                      className="plus-btn"
                      style={{ cursor: 'pointer' }}
                      onClick={() => openQuickView(
                        assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (9).jpeg"),
                        "Green Printed Tote",
                        { category: "New Arrivals", itemCode: "DGF-ARR-05", moq: "50 Pcs", material: "Botanical Motif Canvas & Double Reinforced Seams" }
                      )}
                      title="Quick Specifications"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-dark btn-cart"
                    onClick={() => openQuickView(
                      assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.29 PM (9).jpeg"),
                      "Green Printed Tote",
                      { category: "New Arrivals", itemCode: "DGF-ARR-05", moq: "50 Pcs", material: "Botanical Motif Canvas & Double Reinforced Seams" }
                    )}
                  >
                    QUICK VIEW / RFQ →
                  </button>
                </div>
              </div>
            </div>
            <div className="arrivals-nav next" id="arrNext"><svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg></div>
          </div>
          <div className="modern-pagination" id="arrPagination">
            <div className="page-item active" data-index={0}>01</div>
            <div className="page-line" />
            <div className="page-item" data-index={1}>02</div>
            <div className="page-item" data-index={2}>03</div>
            <div className="page-item" data-index={3}>04</div>
            <div className="page-item" data-index={4}>05</div>
          </div>
        </section>
        {/* Best Sellers Banner */}
        <section className="best-sellers-banner">
          {/* Top Rated Badge */}
          <div className="bs-badge">
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <div>TOP</div>
            <div>RATED</div>
          </div>
          <div className="bs-container">
            <div className="bs-left-content">
              <div className="bs-eyebrow">
                <svg width={30} height={10} viewBox="0 0 30 10" className="arr-left"><line x1={30} y1={5} x2={0} y2={5} stroke="#c69d57" /><polyline points="5,1 0,5 5,9" fill="none" stroke="#c69d57" /></svg>
                TRENDING NOW
                <svg width={30} height={10} viewBox="0 0 30 10" className="arr-right"><line x1={0} y1={5} x2={30} y2={5} stroke="#c69d57" /><polyline points="25,1 30,5 25,9" fill="none" stroke="#c69d57" /></svg>
              </div>
              <h2>Best Sellers<br />Collection</h2>
              <p>Handpicked styles loved by all, just for you.</p>
              <button
                type="button"
                className="btn btn-gold bs-btn"
                onClick={() => navigate('/product')}
                style={{ cursor: 'pointer', border: 'none' }}
              >
                EXPLORE COLLECTION →
              </button>
            </div>
            <div className="bs-right-content">
              <div className="bs-cards">
                {/* Card 1 */}
                <div
                  className="bs-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => openQuickView(
                    assetUrl("img/lichi-remove.png"),
                    "Signature Lichi Texture Bag",
                    { category: "Best Sellers", itemCode: "DGF-BS-01", moq: "40 Pcs", material: "Textured Premium Grain & Gold Hardware" }
                  )}
                >
                  <div className="bs-spotlight-source" />
                  <div className="bs-spotlight" />
                  <div className="bs-pedestal" />
                  <img src={assetUrl("img/lichi-remove.png")} alt="Best Seller 1" />
                </div>
                {/* Card 2 */}
                <div
                  className="bs-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => openQuickView(
                    assetUrl("img/w-remove.png"),
                    "Monochrome Structured Handbag",
                    { category: "Best Sellers", itemCode: "DGF-BS-02", moq: "40 Pcs", material: "Dual-tone Structured Finish & Custom Lining" }
                  )}
                >
                  <div className="bs-spotlight-source" />
                  <div className="bs-spotlight" />
                  <div className="bs-pedestal" />
                  <img src={assetUrl("img/w-remove.png")} alt="Best Seller 2" />
                </div>
                {/* Card 3 */}
                <div
                  className="bs-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => openQuickView(
                    assetUrl("img/mango-remove.png"),
                    "Mango Saffron Luxury Tote",
                    { category: "Best Sellers", itemCode: "DGF-BS-03", moq: "50 Pcs", material: "Artisan Dyed Rich Tone Fabric & Sturdy Handles" }
                  )}
                >
                  <div className="bs-spotlight-source" />
                  <div className="bs-spotlight" />
                  <div className="bs-pedestal" />
                  <img src={assetUrl("img/mango-remove.png")} alt="Best Seller 3" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Popular Products Grid */}
        <section className="popular-products">
          <div className="section-header">
            <h2>POPULAR PRODUCTS</h2>
            <p className="subtitle">Our Most Loved Picks</p>
            <button
              type="button"
              className="view-all"
              onClick={() => navigate('/product')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'inherit' }}
            >
              View All Products →
            </button>
          </div>
          <div className="popular-slider-shell">
            <div className="product-grid popular-slider-track" ref={popularTrackRef} aria-label="Popular products carousel">
              {/* Grid Item 1 */}
              <div
                className="grid-item"
                style={{ cursor: 'pointer' }}
                onClick={() => openQuickView(
                  assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.30 PM (3).jpeg"),
                  "Beach Vibes Tote",
                  { category: "Popular Products", itemCode: "DGF-POP-01", moq: "50 Pcs", material: "Natural Woven Cotton & Reinforced Straps" }
                )}
              >
                <div
                  className={`card-heart ${isSaved('Beach Vibes Tote') ? 'is-saved' : ''}`}
                  onClick={(e) =>
                    handleHeartClick(e, {
                      title: 'Beach Vibes Tote',
                      imgSrc: assetUrl('img/WhatsApp Image 2026-08-12 at 1.39.30 PM (3).jpeg'),
                      category: 'Popular Products',
                      itemCode: 'DGF-POP-01',
                      moq: '50 Pcs'
                    })
                  }
                  title={isSaved('Beach Vibes Tote') ? 'Remove from shortlist' : 'Save for Inquiry'}
                >
                  <svg viewBox="0 0 24 24" fill={isSaved('Beach Vibes Tote') ? '#c69d57' : 'none'} stroke={isSaved('Beach Vibes Tote') ? '#c69d57' : 'currentColor'} strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <img src={assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.30 PM (3).jpeg")} alt="Bag" />
                <h4 className="product-name">Beach Vibes Tote</h4>
                <div className="product-price">MOQ: 50 Pcs · Export Grade</div>
              </div>
              {/* Grid Item 2 */}
              <div
                className="grid-item"
                style={{ cursor: 'pointer' }}
                onClick={() => openQuickView(
                  assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.30 PM (4).jpeg"),
                  "Printed Shoulder Bag",
                  { category: "Popular Products", itemCode: "DGF-POP-02", moq: "60 Pcs", material: "Floral Print & Brass Finish Hardware" }
                )}
              >
                <div
                  className={`card-heart ${isSaved('Printed Shoulder Bag') ? 'is-saved' : ''}`}
                  onClick={(e) =>
                    handleHeartClick(e, {
                      title: 'Printed Shoulder Bag',
                      imgSrc: assetUrl('img/WhatsApp Image 2026-08-12 at 1.39.30 PM (4).jpeg'),
                      category: 'Popular Products',
                      itemCode: 'DGF-POP-02',
                      moq: '60 Pcs'
                    })
                  }
                  title={isSaved('Printed Shoulder Bag') ? 'Remove from shortlist' : 'Save for Inquiry'}
                >
                  <svg viewBox="0 0 24 24" fill={isSaved('Printed Shoulder Bag') ? '#c69d57' : 'none'} stroke={isSaved('Printed Shoulder Bag') ? '#c69d57' : 'currentColor'} strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <img src={assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.30 PM (4).jpeg")} alt="Bag" />
                <h4 className="product-name">Printed Shoulder Bag</h4>
                <div className="product-price">MOQ: 60 Pcs · Direct Factory</div>
              </div>
              {/* Grid Item 3 */}
              <div
                className="grid-item"
                style={{ cursor: 'pointer' }}
                onClick={() => openQuickView(
                  assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.30 PM (5).jpeg"),
                  "Chic Pink Handbag",
                  { category: "Popular Products", itemCode: "DGF-POP-03", moq: "50 Pcs", material: "Pastel Luxury Grain PU with OEM Branding" }
                )}
              >
                <div
                  className={`card-heart ${isSaved('Chic Pink Handbag') ? 'is-saved' : ''}`}
                  onClick={(e) =>
                    handleHeartClick(e, {
                      title: 'Chic Pink Handbag',
                      imgSrc: assetUrl('img/WhatsApp Image 2026-08-12 at 1.39.30 PM (5).jpeg'),
                      category: 'Popular Products',
                      itemCode: 'DGF-POP-03',
                      moq: '50 Pcs'
                    })
                  }
                  title={isSaved('Chic Pink Handbag') ? 'Remove from shortlist' : 'Save for Inquiry'}
                >
                  <svg viewBox="0 0 24 24" fill={isSaved('Chic Pink Handbag') ? '#c69d57' : 'none'} stroke={isSaved('Chic Pink Handbag') ? '#c69d57' : 'currentColor'} strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <img src={assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.30 PM (5).jpeg")} alt="Bag" />
                <h4 className="product-name">Chic Pink Handbag</h4>
                <div className="product-price">MOQ: 50 Pcs · Custom OEM</div>
              </div>
              {/* Grid Item 4 */}
              <div
                className="grid-item"
                style={{ cursor: 'pointer' }}
                onClick={() => openQuickView(
                  assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.30 PM (6).jpeg"),
                  "Boho Sling Bag",
                  { category: "Popular Products", itemCode: "DGF-POP-04", moq: "60 Pcs", material: "Hand-loomed Textured Fabric with Tassel Detailing" }
                )}
              >
                <div
                  className={`card-heart ${isSaved('Boho Sling Bag') ? 'is-saved' : ''}`}
                  onClick={(e) =>
                    handleHeartClick(e, {
                      title: 'Boho Sling Bag',
                      imgSrc: assetUrl('img/WhatsApp Image 2026-08-12 at 1.39.29 PM (6).jpeg'),
                      category: 'Popular Products',
                      itemCode: 'DGF-POP-04',
                      moq: '60 Pcs'
                    })
                  }
                  title={isSaved('Boho Sling Bag') ? 'Remove from shortlist' : 'Save for Inquiry'}
                >
                  <svg viewBox="0 0 24 24" fill={isSaved('Boho Sling Bag') ? '#c69d57' : 'none'} stroke={isSaved('Boho Sling Bag') ? '#c69d57' : 'currentColor'} strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <img src={assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.30 PM (6).jpeg")} alt="Bag" />
                <h4 className="product-name">Boho Sling Bag</h4>
                <div className="product-price">MOQ: 60 Pcs · Handcrafted</div>
              </div>
              {/* Grid Item 5 */}
              <div
                className="grid-item"
                style={{ cursor: 'pointer' }}
                onClick={() => openQuickView(
                  assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.30 PM.jpeg"),
                  "Elegant Clutch",
                  { category: "Popular Products", itemCode: "DGF-POP-05", moq: "40 Pcs", material: "Intricate Silk Beadwork & Metallic Frame" }
                )}
              >
                <div
                  className={`card-heart ${isSaved('Elegant Clutch') ? 'is-saved' : ''}`}
                  onClick={(e) =>
                    handleHeartClick(e, {
                      title: 'Elegant Clutch',
                      imgSrc: assetUrl('img/WhatsApp Image 2026-08-12 at 1.39.30 PM.jpeg'),
                      category: 'Popular Products',
                      itemCode: 'DGF-POP-05',
                      moq: '40 Pcs'
                    })
                  }
                  title={isSaved('Elegant Clutch') ? 'Remove from shortlist' : 'Save for Inquiry'}
                >
                  <svg viewBox="0 0 24 24" fill={isSaved('Elegant Clutch') ? '#c69d57' : 'none'} stroke={isSaved('Elegant Clutch') ? '#c69d57' : 'currentColor'} strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <img src={assetUrl("img/WhatsApp Image 2026-08-12 at 1.39.30 PM.jpeg")} alt="Bag" />
                <h4 className="product-name">Elegant Clutch</h4>
                <div className="product-price">MOQ: 40 Pcs · Beaded Silk</div>
              </div>
            </div>
            <div className="popular-slider-note"><span className="popular-slider-line" /> CURATED FOR YOUR EVERYDAY <span className="popular-slider-line" /></div>
          </div>
        </section>
        {/* Craftsmanship Section */}
        <section className="craftsmanship-section">
          <div className="craft-header">
            <div className="craft-eyebrow">OUR CRAFTSMANSHIP</div>
            <div className="craft-diamond">
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth={2}>
                <rect x={10} y={10} width={4} height={4} transform="rotate(45 12 12)" />
              </svg>
            </div>
            <h2 className="craft-title">The Art Behind Every Bag</h2>
            <p className="craft-subtitle">Thoughtful design. Finest materials. Handcrafted to perfection.</p>
          </div>
          <div className="craft-grid">
            <div className="craft-img-large">
              <img src={assetUrl("img/img1.png")} alt="Craftsmanship Close up" />
            </div>
            <div className="craft-features">
              <div className="cf-item">
                <div className="cf-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <path d="M14.5 2L2 14.5l7.5 7.5L22 9.5 14.5 2z" />
                  </svg>
                </div>
                <div className="cf-text">
                  <h4>Handcrafted Details</h4>
                  <p>Every stitch is placed with precision by skilled artisans who care for perfection.</p>
                </div>
              </div>
              <div className="cf-line" />
              <div className="cf-item">
                <div className="cf-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <path d="M4 4h16v16H4z" />
                    <path d="M4 12c4 0 8 4 8 8" />
                    <path d="M20 12c-4 0-8-4-8-8" />
                  </svg>
                </div>
                <div className="cf-text">
                  <h4>Premium Materials</h4>
                  <p>We use carefully selected high-quality materials for lasting beauty and durability.</p>
                </div>
              </div>
              <div className="cf-line" />
              <div className="cf-item">
                <div className="cf-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                </div>
                <div className="cf-text">
                  <h4>Designed With Purpose</h4>
                  <p>Timeless designs that blend style and function, <strong>made for the modern woman</strong>.</p>
                </div>
              </div>
            </div>
            <div className="craft-img-small-container">
              <div className="craft-img-small">
                <img src={assetUrl("img/bg-remove-img.png")} alt="Small bag arch" />
              </div>
            </div>
          </div>
        </section>
        {/* Style It Your Way Section */}
        <section className="style-ways-section">
          <div className="sw-container">
            <div className="sw-left">
              <div className="sw-eyebrow">ONE BAG, MULTIPLE WAYS</div>
              <h2 className="sw-title">Style It Your Way</h2>
              <div className="sw-divider">
                <div className="sw-diamond">
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="#c69d57">
                    <rect x={10} y={10} width={4} height={4} transform="rotate(45 12 12)" />
                  </svg>
                </div>
              </div>
              <p className="sw-desc">From casual coffee dates to evening plans, the perfect companion for every moment.</p>
              <div className="sw-features">
                <div className="sw-feat">
                  <div className="sw-feat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1={3} y1={6} x2={21} y2={6} />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                  <div className="sw-feat-text">
                    <h4>Versatile Design</h4>
                    <p>Matches every look effortlessly.</p>
                  </div>
                </div>
                <div className="sw-feat">
                  <div className="sw-feat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div className="sw-feat-text">
                    <h4>All Day Comfort</h4>
                    <p>Lightweight, practical and easy to carry.</p>
                  </div>
                </div>
                <div className="sw-feat">
                  <div className="sw-feat-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                      </polygon>
                    </svg>
                  </div>
                  <div className="sw-feat-text">
                    <h4>Timeless Style</h4>
                    <p>A piece you'll love, season after season.</p>
                  </div>
                </div>
              </div>
              <a href="#" className="btn btn-outline-gold sw-btn">EXPLORE COLLECTION →</a>
            </div>
            <div
              className="sw-right"
              onMouseEnter={() => setSliderPaused(true)}
              onMouseLeave={() => setSliderPaused(false)}
            >
              <div className="sw-tabs">
                {styleSlideLabels.map((label, index) => (
                  <button
                    key={label}
                    className={`sw-tab${activeLookIndex === index ? ' active' : ''}`}
                    type="button"
                    aria-label={`Show ${label.toLowerCase()} look`}
                    onClick={() => goToLook(index)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div
                className="sw-slider-viewport"
                onTouchStart={(event) => {
                  setSliderPaused(true);
                  touchStartRef.current = event.changedTouches[0].clientX;
                }}
                onTouchEnd={(event) => {
                  setSliderPaused(false);
                  if (touchStartRef.current === null) return;
                  const distance = event.changedTouches[0].clientX - touchStartRef.current;
                  touchStartRef.current = null;
                  if (Math.abs(distance) > 40) {
                    if (distance < 0) slideNext();
                    else slidePrev();
                  }
                }}
              >
                <div
                  className="sw-cards"
                  style={{
                    '--sw-active-idx': activeLookIndex,
                    '--sw-desktop-idx': desktopOffset,
                  }}
                  aria-live="polite"
                >
                  {styleLooks.map((look) => (
                    <article
                      key={look.idx}
                      className={`sw-card${look.idx === activeLookIndex ? ' is-active' : ''}`}
                      onClick={() => goToLook(look.idx)}
                    >
                      <div className="sw-card-img">
                        <img
                          src={assetUrl(look.img)}
                          alt={look.title}
                          loading="eager"
                          decoding="sync"
                        />
                      </div>
                      <div className="sw-card-info">
                        <div className="sw-card-icon">{look.icon}</div>
                        <div className="sw-card-text">
                          <h4>{look.title}</h4>
                          <p>{look.desc}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div className="sw-slider-controls">
                <button
                  className="sw-slider-arrow"
                  type="button"
                  aria-label="Previous look"
                  onClick={slidePrev}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <div className="sw-dots" aria-label="Choose a look">
                  {styleSlideLabels.map((label, index) => (
                    <button
                      key={label}
                      className={`dot${activeLookIndex === index ? ' active' : ''}`}
                      type="button"
                      aria-label={`Go to ${label.toLowerCase()} look`}
                      onClick={() => goToLook(index)}
                    />
                  ))}
                </div>
                <button
                  className="sw-slider-arrow"
                  type="button"
                  aria-label="Next look"
                  onClick={slideNext}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Modern Lifestyle / Heritage Showcase Section */}
        <section className="lifestyle-modern" ref={lifestyleRef}>
          <div className="lifestyle-container">
            {/* Left: Editorial Image Showcase */}
            <div className="lifestyle-visual">
              <div className="lifestyle-img-frame">
                <img
                  src={assetUrl("girl-bag/WhatsApp Image 2026-08-12 at 1.40.44 PM.jpeg")}
                  alt="D Galore Luxury Lifestyle Model with Handcrafted Bag"
                  loading="lazy"
                />
                <div className="lifestyle-badge">
                  <span className="lifestyle-badge-sparkle">✦</span>
                  <div className="lifestyle-badge-text">
                    <strong>HANDCRAFTED</strong>
                    <small>SINCE 1984</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Editorial Narrative & CTA */}
            <div className="lifestyle-narrative">
              <div className="lifestyle-pill-eyebrow">
                <span className="lifestyle-pill-dot" />
                ABOUT D GALORE FASHION
              </div>
              <h2 className="lifestyle-title">
                More Than Just a Bag,
                <br />
                <em>It's a Lifestyle.</em>
              </h2>
              <div className="lifestyle-divider">
                <span className="lifestyle-divider-line" />
                <span className="lifestyle-divider-diamond">◆</span>
                <span className="lifestyle-divider-line" />
              </div>
              <p className="lifestyle-desc">
                We create timeless handcrafted bags and accessories blending tradition, craftsmanship,
                and modern international fashion. Every piece is thoughtfully designed with premium
                materials, passion, and elegance.
              </p>
              <div className="lifestyle-cta-row">
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    if (navigate) navigate('/about');
                    else window.location.href = '/about';
                  }}
                  className="lifestyle-btn"
                >
                  <span>READ MORE</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: Modern Interactive Counter Cards */}
            <div className="lifestyle-stats-col">
              {/* Stat 1: Years of Legacy */}
              <div className="lifestyle-stat-card">
                <div className="lifestyle-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx={12} cy={7} r={4} />
                  </svg>
                </div>
                <div className="lifestyle-stat-info">
                  <div className="lifestyle-stat-num-row">
                    <span className="lifestyle-stat-num">{lifestyleCounts.legacy}</span>
                    <span className="lifestyle-stat-plus">+</span>
                  </div>
                  <h4 className="lifestyle-stat-label">Years of Legacy</h4>
                  <p className="lifestyle-stat-sub">Four Decades of Craft</p>
                </div>
              </div>

              {/* Stat 2: Unique Styles */}
              <div className="lifestyle-stat-card">
                <div className="lifestyle-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div className="lifestyle-stat-info">
                  <div className="lifestyle-stat-num-row">
                    <span className="lifestyle-stat-num">{lifestyleCounts.styles}</span>
                    <span className="lifestyle-stat-plus">+</span>
                  </div>
                  <h4 className="lifestyle-stat-label">Unique Styles</h4>
                  <p className="lifestyle-stat-sub">Handcrafted Beaded Edits</p>
                </div>
              </div>

              {/* Stat 3: Global Export Reach */}
              <div className="lifestyle-stat-card">
                <div className="lifestyle-stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <circle cx="12" cy={12} r={10} />
                    <line x1={2} y1={12} x2={22} y2={12} />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div className="lifestyle-stat-info">
                  <div className="lifestyle-stat-num-row">
                    <span className="lifestyle-stat-num">{lifestyleCounts.global}</span>
                    <span className="lifestyle-stat-plus">+</span>
                    <span className="lifestyle-stat-tag">GLOBAL</span>
                  </div>
                  <h4 className="lifestyle-stat-label">Export Reach</h4>
                  <p className="lifestyle-stat-sub">Worldwide Fashion Markets</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer navigate={navigate} showNewsletter={true} />
        {/* Luxury B2B Quick View Modal */}
        {quickViewProduct && createPortal(
          <div className="prod-modal-overlay" onClick={() => setQuickViewProduct(null)}>
            <div className="prod-modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="prod-modal-close"
                onClick={() => setQuickViewProduct(null)}
                aria-label="Close specifications modal"
              >
                ✕
              </button>

              <div className="prod-modal-grid">
                {/* Modal Left Column: Image & Direct WhatsApp */}
                <div className="prod-modal-left">
                  <div className="prod-modal-main-img">
                    <img
                      src={quickViewProduct.image}
                      alt={quickViewProduct.title}
                    />
                  </div>

                  <button
                    type="button"
                    className="prod-btn-modal-whatsapp"
                    onClick={() => handleWhatsAppInquiry(quickViewProduct)}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    Inquire on WhatsApp
                  </button>

                  <button
                    type="button"
                    className="prod-btn-modal-save"
                    onClick={() => {
                      toggleWishlistItem({
                        title: quickViewProduct.title,
                        imgSrc: quickViewProduct.image,
                        category: quickViewProduct.category,
                        itemCode: quickViewProduct.itemCode,
                        moq: quickViewProduct.moq
                      });
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '11px 16px',
                      marginTop: '10px',
                      borderRadius: '8px',
                      border: '1px solid #c69d57',
                      background: isSaved(quickViewProduct.title) ? '#c69d57' : '#ffffff',
                      color: isSaved(quickViewProduct.title) ? '#ffffff' : '#171815',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={isSaved(quickViewProduct.title) ? '#ffffff' : 'none'} stroke={isSaved(quickViewProduct.title) ? '#ffffff' : '#c69d57'} strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {isSaved(quickViewProduct.title) ? 'Saved in Wishlist ✓' : 'Save to Shortlist (♡)'}
                  </button>
                </div>

                {/* Modal Right Column: Technical Details & RFQ */}
                <div className="prod-modal-info">
                  <div className="prod-modal-header">
                    <span className="prod-modal-cat">{quickViewProduct.category}</span>
                    <span className="prod-modal-sku">Item Code: <strong>{quickViewProduct.itemCode}</strong></span>
                  </div>

                  <h2 className="prod-modal-title">{quickViewProduct.title}</h2>

                  <p className="prod-modal-desc">{quickViewProduct.description}</p>

                  {/* 2-Column Technical Specifications Grid */}
                  <div className="prod-modal-specs-grid">
                    <div className="prod-spec-cell">
                      <span className="prod-spec-lbl">MOQ:</span>
                      <span className="prod-spec-val">{quickViewProduct.moq}</span>
                    </div>
                    <div className="prod-spec-cell">
                      <span className="prod-spec-lbl">Lead Time:</span>
                      <span className="prod-spec-val">{quickViewProduct.leadTime}</span>
                    </div>
                    <div className="prod-spec-cell">
                      <span className="prod-spec-lbl">Sampling:</span>
                      <span className="prod-spec-val">{quickViewProduct.sampling}</span>
                    </div>
                    <div className="prod-spec-cell">
                      <span className="prod-spec-lbl">Direct Factory:</span>
                      <span className="prod-spec-val">Pilkhuwa Textile Hub</span>
                    </div>
                    <div className="prod-spec-cell prod-spec-full">
                      <span className="prod-spec-lbl">Material &amp; Craft:</span>
                      <span className="prod-spec-val">{quickViewProduct.material}</span>
                    </div>
                    <div className="prod-spec-cell prod-spec-full">
                      <span className="prod-spec-lbl">Private Label:</span>
                      <span className="prod-spec-val prod-spec-green">✓ Custom metal badges, debossing &amp; OEM branding supported</span>
                    </div>
                  </div>

                  {/* Color / Finish Swatches */}
                  <div className="prod-modal-colors">
                    <label>
                      Sample Swatches: <strong>{quickViewProduct.colorNames[selectedColorIndex]}</strong>
                    </label>
                    <div className="prod-color-options">
                      {quickViewProduct.colors.map((color, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`prod-color-btn ${selectedColorIndex === idx ? 'is-selected' : ''}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColorIndex(idx)}
                          title={quickViewProduct.colorNames[idx]}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Email RFQ Link & View Catalog CTA */}
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '6px' }}>
                    <a
                      href={`mailto:rv8116677@gmail.com?subject=${encodeURIComponent(`B2B Export Quotation Request: ${quickViewProduct.itemCode} - ${quickViewProduct.title}`)}&body=${encodeURIComponent(`Hello D Galore Fashion Team,\n\nI am interested in receiving an export quotation and technical sample for:\n\n• Item Code: ${quickViewProduct.itemCode}\n• Product Name: ${quickViewProduct.title}\n• Category: ${quickViewProduct.category}\n• Desired Quantity:\n• Country/Destination Port:\n\nPlease share lead time and FOB/CIF rates.\n\nThank you!`)}`}
                      className="prod-btn-modal-email"
                      style={{ flex: '1', minWidth: '220px' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      Email RFQ / Tech Pack
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setQuickViewProduct(null);
                        navigate('/product');
                      }}
                      className="btn btn-outline"
                      style={{
                        padding: '10px 18px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        letterSpacing: '0.06em',
                        border: '1px solid #171815',
                        borderRadius: '6px',
                        background: '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      View All in Catalog →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>

    </>
  );
}
