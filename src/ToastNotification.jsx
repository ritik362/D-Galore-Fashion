import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ToastNotification() {
  const [toast, setToast] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let timer = null;

    const handleToast = (e) => {
      if (e && e.detail && e.detail.message) {
        if (timer) clearTimeout(timer);
        setToast(e.detail.message);
        timer = setTimeout(() => {
          setToast(null);
        }, 2800);
      }
    };

    window.addEventListener('dg_show_toast', handleToast);
    return () => {
      window.removeEventListener('dg_show_toast', handleToast);
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!mounted || !toast) return null;

  return createPortal(
    <div className="global-toast-pill" role="status" aria-live="polite">
      <span className="global-toast-sparkle">&#10024;</span>
      <span className="global-toast-text">{toast}</span>
    </div>,
    document.body
  );
}

