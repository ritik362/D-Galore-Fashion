import React from 'react';
import { createPortal } from 'react-dom';

export default function FloatingContact() {
  const waUrl = 'https://wa.me/919999920003?text=' + encodeURIComponent(
    'Hello D Galore Fashion Team,\n\nI am contacting you from your website regarding your handcrafted bag manufacturing and export services. Please share catalog and MOQ details. Thank you!'
  );

  const mailUrl = 'mailto:rv8116677@gmail.com?subject=' + encodeURIComponent(
    'B2B Export Inquiry - D Galore Fashion'
  ) + '&body=' + encodeURIComponent(
    'Hello D Galore Fashion Team,\n\nI am interested in receiving a B2B export quotation for your bags.\n\n• Company / Buyer Name:\n• Country / Port:\n• Product Interest:\n• Quantity Requirement:\n\nPlease share catalog pricing and lead times.\n\nThank you!'
  );

  // Use createPortal to mount directly to document.body
  // This guarantees position: fixed is NEVER broken by any parent CSS transform or page animation!
  return createPortal(
    <aside className="global-floating-contact" aria-label="Direct Contact Channels">
      {/* WhatsApp Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="global-float-btn float-whatsapp"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp (+91 99999 20003)"
      >
        <span className="global-float-tooltip">Chat on WhatsApp</span>
        <svg viewBox="0 0 24 24" width={26} height={26} fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>

      {/* Phone Call Button */}
      <a
        href="tel:+919999920003"
        className="global-float-btn float-phone"
        aria-label="Call +91 99999 20003"
        title="Call +91 99999 20003"
      >
        <span className="global-float-tooltip">Call +91 99999 20003</span>
        <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>

      {/* Email RFQ / Contact Button */}
      <a
        href={mailUrl}
        className="global-float-btn float-mail"
        aria-label="Email RFQ to rv8116677@gmail.com"
        title="Email RFQ (rv8116677@gmail.com)"
      >
        <span className="global-float-tooltip">Email RFQ / Inquiry</span>
        <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </a>
    </aside>,
    document.body
  );
}
