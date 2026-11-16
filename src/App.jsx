import React, { useState, useEffect } from 'react';
import HomePage from './HomePage.jsx';
import AboutUs from './AboutUs.jsx';
import ProductPage from './ProductPage.jsx';
import ContactPage from './ContactPage.jsx';
import FloatingContact from './FloatingContact.jsx';
import WishlistDrawer from './WishlistDrawer.jsx';
import ToastNotification from './ToastNotification.jsx';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const path = currentPath.toLowerCase().replace(/\/$/, '') || '/';

  let pageContent;
  if (path === '/about' || path.endsWith('/about.html')) {
    pageContent = <AboutUs navigate={navigate} />;
  } else if (path === '/product' || path === '/products' || path.endsWith('/product.html')) {
    pageContent = <ProductPage navigate={navigate} />;
  } else if (path === '/contact' || path.endsWith('/contact.html')) {
    pageContent = <ContactPage navigate={navigate} />;
  } else {
    pageContent = <HomePage navigate={navigate} />;
  }

  return (
    <div key={path} className="page-transition-enter">
      {pageContent}
      <FloatingContact />
      <WishlistDrawer navigate={navigate} />
      <ToastNotification />
    </div>
  );
}
