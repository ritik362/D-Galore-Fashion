import React, { useState } from 'react';

export default function Footer({ navigate, showNewsletter = false }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };
  const handleNavClick = (e, path) => {
    e.preventDefault();
    if (navigate) {
      navigate(path);
    } else {
      window.location.href = path;
    }
  };

  const handleScrollTo = (e, selector) => {
    e.preventDefault();
    if (window.location.pathname !== '/' && !window.location.pathname.endsWith('/index.html')) {
      if (navigate) navigate('/');
      setTimeout(() => {
        const el = document.querySelector(selector);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Newsletter (Rendered ONLY on Home Page) */}
      {showNewsletter && (
        <section className="newsletter">
          <div className="newsletter-content">
            <div className="news-left">
              <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth={2}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <div>
                <h3>JOIN OUR NEWSLETTER</h3>
                <p>Be the first to know about new arrivals, exclusive offers and more.</p>
              </div>
            </div>
            <div className="news-right">
              {newsletterSuccess ? (
                <div style={{ color: '#c69d57', fontWeight: 600, fontSize: '0.95rem' }}>
                  ✓ Thank you for subscribing to D Galore Fashion updates!
                </div>
              ) : (
                <form className="news-form" onSubmit={handleNewsletterSubmit}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                  />
                  <button type="submit" className="btn btn-gold">SUBSCRIBE →</button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-columns">
            <div className="col-brand">
              <div
                className="brand footer-brand"
                onClick={(e) => handleNavClick(e, '/')}
                style={{ cursor: 'pointer' }}
              >
                <span className="logo-jc">DG</span>
                <div className="logo-text">
                  <span className="brand-name">D GALORE</span>
                  <span className="brand-sub">FASHION · EST. 1984</span>
                </div>
              </div>
              <p>Manufacturer & exporter of handcrafted fashion accessories since 1984.</p>
              <div className="social-icons">
                <a href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.645.07 4.849 0 3.205-.012 3.584-.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a href="#" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="col-links">
              <h4>SHOP</h4>
              <a href="/#shop" onClick={(e) => handleScrollTo(e, '.shop-category')}>All Products</a>
              <a href="/#new-arrivals" onClick={(e) => handleScrollTo(e, '.new-arrivals')}>New Arrivals</a>
              <a href="/#best-sellers" onClick={(e) => handleScrollTo(e, '.best-sellers-banner')}>Best Sellers</a>
              <a href="/#collections" onClick={(e) => handleScrollTo(e, '.popular-products')}>Collections</a>
              <a href="/#shop" onClick={(e) => handleScrollTo(e, '.shop-category')}>Accessories</a>
            </div>

            <div className="col-links">
              <h4>COMPANY</h4>
              <a href="/about" onClick={(e) => handleNavClick(e, '/about')}>About Us</a>
              <a href="/about" onClick={(e) => handleNavClick(e, '/about')}>Our Story</a>
              <a href="/#popular" onClick={(e) => handleScrollTo(e, '.popular-products')}>Blog</a>
              <a href="/about" onClick={(e) => handleNavClick(e, '/about')}>Careers</a>
              <a href="/contact" onClick={(e) => handleNavClick(e, '/contact')}>Contact Us</a>
            </div>

            <div className="col-links">
              <h4>HELP</h4>
              <a href="/contact" onClick={(e) => handleNavClick(e, '/contact')}>Shipping &amp; Logistics</a>
              <a href="/contact" onClick={(e) => handleNavClick(e, '/contact')}>OEM Sampling</a>
              <a href="/contact" onClick={(e) => handleNavClick(e, '/contact')}>Export FAQs</a>
              <a href="/product" onClick={(e) => handleNavClick(e, '/product')}>B2B Catalog</a>
              <a href="/contact" onClick={(e) => handleNavClick(e, '/contact')}>Factory Visit</a>
            </div>

            <div className="col-contact">
              <h4>CONTACT US</h4>
              <div className="contact-line">
                <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth={2}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +91 99999 20003
              </div>
              <div className="contact-line">
                <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth={2}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                info@dgalorefashion.com
              </div>
              <div className="contact-line">
                <svg viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth={2}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx={12} cy={10} r={3} />
                </svg>
                P-88, Textile Centre, Pilkhuwa – 245304, Ghaziabad (Delhi NCR), India
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2024 D Galore Fashion Pvt. Ltd. All Rights Reserved.</p>
            <div className="payment-icons">
              <img src="https://via.placeholder.com/40x25/fff/000?text=VISA" alt="Visa" />
              <img src="https://via.placeholder.com/40x25/fff/000?text=MC" alt="Mastercard" />
              <img src="https://via.placeholder.com/40x25/fff/000?text=UPI" alt="UPI" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

