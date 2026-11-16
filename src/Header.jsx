import React, { useState, useEffect } from 'react';
import { getWishlist, openWishlistDrawer } from './wishlistState.js';

export default function Header({ activePage = 'home', navigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(() => getWishlist().length);

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e && e.detail) {
        setWishlistCount(e.detail.length);
      } else {
        setWishlistCount(getWishlist().length);
      }
    };
    window.addEventListener('dg_wishlist_updated', handleUpdate);
    return () => window.removeEventListener('dg_wishlist_updated', handleUpdate);
  }, []);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (navigate) {
      navigate(path);
    } else {
      window.location.href = path;
    }
  };

  const handleScrollTo = (e, selector) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (activePage !== 'home') {
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
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-container">
          <div className="top-bar-left">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1 .4-1 1v10H2v2h2" />
              <circle cx={7} cy={17} r={2} />
              <circle cx={17} cy={17} r={2} />
              <rect x={5} y={7} width={7} height={10} />
            </svg>
            Export Manufacturing House · Est. 1984
          </div>
          <div className="top-bar-center">
            <span>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx={12} cy={12} r={10} />
                <line x1={2} y1={12} x2={22} y2={12} />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Worldwide Logistics (15+ Countries)
            </span>
            <span>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Custom OEM Prototyping
            </span>
          </div>
          <div className="top-bar-right">
            <a href="#" aria-label="Twitter">
              <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.645.07 4.849 0 3.205-.012 3.584-.07 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a href="#" aria-label="Pinterest">
              <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.195 0 7.458 2.991 7.458 6.98 0 4.173-2.628 7.531-6.279 7.531-1.226 0-2.378-.638-2.771-1.391l-.754 2.876c-.273 1.042-1.011 2.345-1.505 3.141 1.118.344 2.308.53 3.541.53 6.621 0 11.988-5.367 11.988-11.987C24.005 5.367 18.638 0 12.017 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div
            className="brand"
            onClick={(e) => handleNavClick(e, '/')}
            style={{ cursor: 'pointer' }}
          >
            <span className="logo-jc">DG</span>
            <div className="logo-text">
              <span className="brand-name">D GALORE</span>
              <span className="brand-sub">FASHION · EST. 1984</span>
            </div>
          </div>

          {/* Desktop & Mobile Dropdown Navigation */}
          <nav className={`nav-links${mobileMenuOpen ? ' mobile-open' : ''}`}>
            <a
              href="/"
              className={activePage === 'home' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, '/')}
            >
              Home
            </a>
            <a
              href="/about"
              className={activePage === 'about' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, '/about')}
            >
              About Us
            </a>
            <a
              href="/product"
              className={activePage === 'product' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, '/product')}
            >
              Product
            </a>
            <a
              href="/contact"
              className={activePage === 'contact' ? 'active' : ''}
              onClick={(e) => handleNavClick(e, '/contact')}
            >
              Contact Us
            </a>
            <a
              href="/product"
              onClick={(e) => handleNavClick(e, '/product')}
            >
              B2B Catalog &amp; Specs
            </a>
          </nav>

          {/* Right Header Controls (Always visible outside the dropdown) */}
          <div className="nav-icons">
            <a
              href="https://wa.me/919999920003?text=Hello%20D%20Galore%20Fashion!%20I%20am%20interested%20in%20B2B%20export%20quotation%20and%20sampling."
              target="_blank"
              rel="noopener noreferrer"
              className="header-whatsapp-btn"
              title="Direct Factory WhatsApp Inquiry"
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>B2B Inquiry</span>
            </a>

            {/* Dil (Heart) Saved Products / Wishlist Button */}
            <button
              type="button"
              className="header-wishlist-btn"
              id="wishlistToggle"
              onClick={() => openWishlistDrawer()}
              aria-label={`Saved products: ${wishlistCount} items`}
              title="Saved Products"
            >
              <svg
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill={wishlistCount > 0 ? '#c69d57' : 'none'}
                stroke={wishlistCount > 0 ? '#c69d57' : '#111111'}
                strokeWidth={1.8}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="wishlist-badge" id="wishlistBadge">
                {wishlistCount}
              </span>
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              className={`menu-toggle${mobileMenuOpen ? ' active' : ''}`}
              id="mobileMenuToggle"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

