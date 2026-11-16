import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  getWishlist,
  removeFromWishlist,
  clearWishlist,
  closeWishlistDrawer
} from './wishlistState.js';

export default function WishlistDrawer({ navigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(() => getWishlist());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleUpdate = (e) => {
      if (e && e.detail) {
        setItems(e.detail);
      } else {
        setItems(getWishlist());
      }
    };

    window.addEventListener('dg_open_wishlist', handleOpen);
    window.addEventListener('dg_close_wishlist', handleClose);
    window.addEventListener('dg_wishlist_updated', handleUpdate);

    return () => {
      window.removeEventListener('dg_open_wishlist', handleOpen);
      window.removeEventListener('dg_close_wishlist', handleClose);
      window.removeEventListener('dg_wishlist_updated', handleUpdate);
    };
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!mounted) return null;

  const handleClose = () => {
    setIsOpen(false);
    closeWishlistDrawer();
  };

  const handleNavigateCatalog = (e) => {
    e.preventDefault();
    handleClose();
    if (navigate) {
      navigate('/product');
    } else {
      window.location.href = '/product';
    }
  };

  // Build inquiry message for all saved items
  const getAllEnquiryLink = () => {
    const lines = items.map(
      (item, idx) =>
        `${idx + 1}. ${item.title}${item.category ? ` [${item.category}]` : ''} - MOQ: ${item.moq || '50 Pcs'}`
    );
    const text = `Hello D Galore Fashion! I am interested in wholesale quotation and sampling for the following saved products:\n\n${lines.join(
      '\n'
    )}\n\nPlease share export price list and production lead times.`;
    return `https://wa.me/919999920003?text=${encodeURIComponent(text)}`;
  };

  const getItemEnquiryLink = (item) => {
    const text = `Hello D Galore Fashion! I would like to enquire about wholesale pricing for:\nProduct: ${item.title}\nCategory: ${item.category || 'Handcrafted'}\nItem Code: ${item.itemCode || 'DGF'}\nMOQ: ${item.moq || '50 Pcs'}`;
    return `https://wa.me/919999920003?text=${encodeURIComponent(text)}`;
  };

  return createPortal(
    <>
      {/* Backdrop Overlay */}
      <div
        className={`wishlist-drawer-overlay ${isOpen ? 'active' : ''}`}
        onClick={handleClose}
        aria-hidden={!isOpen}
      />

      {/* Sliding Drawer */}
      <aside
        className={`wishlist-drawer ${isOpen ? 'active' : ''}`}
        aria-label="Saved Products Wishlist Drawer"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="wishlist-drawer-header">
          <div className="wishlist-header-title-box">
            <svg
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="#c69d57"
              stroke="#c69d57"
              strokeWidth={1.5}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <h2>Saved Products</h2>
            <span className="wishlist-header-count">({items.length})</span>
          </div>
          <button
            type="button"
            className="wishlist-drawer-close"
            id="wishlistCloseBtn"
            onClick={handleClose}
            aria-label="Close saved products drawer"
            title="Close (Esc)"
          >
            <svg
              width={22}
              height={22}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="wishlist-drawer-items" id="wishlistItems">
          {items.length === 0 ? (
            <div className="wishlist-empty-state">
              <div className="wishlist-empty-icon">
                <svg
                  width={46}
                  height={46}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c69d57"
                  strokeWidth={1.5}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="wishlist-empty-title">Your shortlist is empty</h3>
              <p className="wishlist-empty-text">
                Explore our handcrafted luxury collections and tap the heart (♡) icon on any bag to save it here for inquiry!
              </p>
              <button
                type="button"
                className="wishlist-empty-btn"
                onClick={handleNavigateCatalog}
              >
                Browse Catalog &rarr;
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={item.id || `${item.title}-${index}`} className="wishlist-item">
                <div className="wishlist-item-img">
                  {item.imgSrc ? (
                    <img src={item.imgSrc} alt={item.title} loading="lazy" />
                  ) : (
                    <div className="wishlist-item-placeholder">DG</div>
                  )}
                </div>
                <div className="wishlist-item-details">
                  <h4 className="wishlist-item-title">{item.title}</h4>
                  <div className="wishlist-item-meta">
                    <span className="wishlist-item-cat">{item.category || 'Handcrafted'}</span>
                    {item.moq && (
                      <span className="wishlist-item-moq">MOQ: {item.moq}</span>
                    )}
                  </div>
                  <div className="wishlist-item-actions">
                    <a
                      href={getItemEnquiryLink(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wishlist-item-quote"
                    >
                      <svg
                        width={13}
                        height={13}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      Get Quote
                    </a>
                    <button
                      type="button"
                      className="wishlist-item-remove"
                      onClick={() => removeFromWishlist(item.id || item.title)}
                      title="Remove from shortlist"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions (Only when items exist) */}
        {items.length > 0 && (
          <div className="wishlist-drawer-footer">
            <a
              href={getAllEnquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-enquire-all"
            >
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Enquire for all saved items
            </a>
            <div className="wishlist-footer-sub">
              <button
                type="button"
                className="wishlist-clear-btn"
                onClick={clearWishlist}
              >
                Clear Shortlist
              </button>
              <span className="wishlist-footer-note">Direct WhatsApp Factory Quotation</span>
            </div>
          </div>
        )}
      </aside>
    </>,
    document.body
  );
}

