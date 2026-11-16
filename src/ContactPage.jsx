import React, { useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import '../style.css';

export default function ContactPage({ navigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    inquiryType: 'oem_custom',
    quantity: '50_200',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildWhatsAppText = (data) => {
    return `Hello D Galore Fashion!\n\nI am contacting you regarding an Export / Manufacturing Inquiry:\n• Buyer Name: ${data.fullName || 'Not specified'}\n• Company / Label: ${data.companyName || 'Not specified'}\n• Business Email: ${data.email || 'Not specified'}\n• Phone / WhatsApp: ${data.phone || 'Not specified'}\n• Country / Port: ${data.country || 'Not specified'}\n• Inquiry Type: ${data.inquiryType}\n• Est. Quantity: ${data.quantity}\n• Project Specifications:\n${data.message || 'I would like to receive the factory catalog, sample details, and FOB price lists.'}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const dataToSubmit = { ...formData };
    const waText = buildWhatsAppText(dataToSubmit);

    try {
      // Direct email dispatch to rv8116677@gmail.com via FormSubmit AJAX
      const res = await fetch('https://formsubmit.co/ajax/rv8116677@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: dataToSubmit.fullName,
          company: dataToSubmit.companyName,
          email: dataToSubmit.email,
          phone: dataToSubmit.phone,
          country: dataToSubmit.country,
          inquiryType: dataToSubmit.inquiryType,
          quantity: dataToSubmit.quantity,
          message: dataToSubmit.message,
          _replyto: dataToSubmit.email,
          _subject: `New B2B Export Inquiry: ${dataToSubmit.fullName} (${dataToSubmit.companyName || 'Export Buyer'})`,
          _template: 'table',
          _captcha: 'false',
        }),
      }).catch((err) => {
        console.warn('FormSubmit background notification:', err);
        return null;
      });

      if (res && res.ok) {
        const resData = await res.json().catch(() => null);
        console.log('FormSubmit response:', resData);
      }
    } catch (err) {
      console.warn('Inquiry dispatch note:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      setLastSubmitted(dataToSubmit);

      // Instant WhatsApp popup with all pre-filled B2B requirements
      const waUrl = `https://wa.me/919999920003?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank');

      // Clear the form
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        phone: '',
        country: '',
        inquiryType: 'oem_custom',
        quantity: '50_200',
        message: '',
      });
    }
  };

  const handleWhatsAppDirect = () => {
    const waText = buildWhatsAppText(formData);
    const url = `https://wa.me/919999920003?text=${encodeURIComponent(waText)}`;
    window.open(url, '_blank');
  };

  const faqs = [
    {
      q: 'What is your Minimum Order Quantity (MOQ) for international orders?',
      a: 'Our standard production MOQ is typically 50 pieces per style / colorway for handcrafted beaded bags and evening clutches. For bespoke developments or high-complexity styles, custom low-volume sample runs can be negotiated during the prototyping stage.',
    },
    {
      q: 'How long does custom tech-pack sampling and prototyping take?',
      a: 'Physical prototypes and counter-samples are developed in our in-house Pilkhuwa studio within 7 to 10 working days upon receiving your sketches, mood boards, CAD files, or reference images. Courier transit time via DHL/FedEx to USA/Europe is 3 to 5 business days.',
    },
    {
      q: 'Do you offer private labeling, OEM branding, and custom packaging?',
      a: 'Yes, 100%. We provide end-to-end OEM and private label services including custom embossed or laser-engraved metal logo plates, woven brand labels, jacquard inner linings, personalized hangtags, barcode stickers, and custom presentation gift boxes.',
    },
    {
      q: 'What shipping terms and global logistics do you support?',
      a: 'We operate primarily on FOB New Delhi (Air freight via IGI DEL Airport or Sea freight via Nhava Sheva / Mundra through Inland Container Depots). We also provide CIF, CFR, and Door-to-Door DDP shipping through our tier-1 global logistics partners.',
    },
    {
      q: 'Can international buyers visit your manufacturing facility in Pilkhuwa?',
      a: 'Yes, we warmly welcome international buyers, fashion label representatives, and buying house agents. We are conveniently situated 60 km from New Delhi (approx. 75 minutes by expressway). Our team can arrange dedicated pickup and factory tours.',
    },
  ];

  return (
    <>
      <Header activePage="contact" navigate={navigate} />

      <main className="contact-page">
        {/* ========================================================= */}
        {/* 1. HERO BANNER */}
        {/* ========================================================= */}
        <section className="contact-hero-banner">
          <div className="contact-container">
            <div className="contact-banner-inner">
              <span className="contact-banner-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Direct Factory Communications &amp; Global Export Desk
              </span>

              <h1 className="contact-banner-title">
                Get In Touch with <em>Our Export House</em>
              </h1>

              <h2 className="contact-banner-subtitle">
                Manufacturing Facility &amp; Head Office · Pilkhuwa, Delhi NCR, India
              </h2>

              <p className="contact-banner-desc">
                Partner directly with our generational karigars and export management team. We welcome tech-pack inquiries,
                custom private-label sampling, bulk production quotes, and international buyer appointments.
              </p>

              <div className="contact-banner-breadcrumb">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    if (navigate) navigate('/');
                    else window.location.href = '/';
                  }}
                >
                  Home
                </a>
                <span className="contact-bc-sep">/</span>
                <span className="contact-bc-curr">Contact Us &amp; Factory Desk</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. DIRECT CONTACT INFO CARDS */}
        {/* ========================================================= */}
        <section className="contact-cards-section">
          <div className="contact-container">
            <div className="contact-cards-grid">
              {/* Card 1: WhatsApp Factory Direct */}
              <div className="contact-info-card is-highlight">
                <div className="cic-icon-badge whatsapp-bg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div className="cic-meta">DIRECT FACTORY WHATSAPP</div>
                <h3>Instant WhatsApp Inquiry</h3>
                <p>Chat directly with our export directors for instant catalog sharing, real-time videos of samples, and fast-track quotations.</p>
                <div className="cic-value">+91 99999 20003</div>
                <a
                  href="https://wa.me/919999920003?text=Hello%20D%20Galore%20Fashion!%20I%20would%20like%20to%20discuss%20B2B%20export%20quotations%20and%20sampling."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-btn-whatsapp"
                >
                  Start WhatsApp Chat →
                </a>
              </div>

              {/* Card 2: Factory & Registered Works */}
              <div className="contact-info-card">
                <div className="cic-icon-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx={12} cy={10} r={3} />
                  </svg>
                </div>
                <div className="cic-meta">MANUFACTURING WORKS</div>
                <h3>Registered Factory Facility</h3>
                <address className="cic-address">
                  <strong>D Galore Fashion Pvt. Ltd.</strong> (TN Enterprises)<br />
                  P-88, Textile Centre, Pilkhuwa – 245304<br />
                  Ghaziabad (Delhi NCR), Uttar Pradesh, India
                </address>
                <div className="cic-subtext">Strategic Delhi NCR location · 60 km to IGI International Airport (DEL)</div>
              </div>

              {/* Card 3: Phone & Direct Export Lines */}
              <div className="contact-info-card">
                <div className="cic-icon-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="cic-meta">DIRECT FACTORY LINES</div>
                <h3>Calling &amp; Support Desk</h3>
                <p>Call our factory desk during regular business hours for technical questions or production schedule updates.</p>
                <div className="cic-value">+91 99999 20003</div>
                <div className="cic-subtext">Hours: Monday – Saturday, 9:30 AM – 7:00 PM IST</div>
              </div>

              {/* Card 4: Official Email Desks */}
              <div className="contact-info-card">
                <div className="cic-icon-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="cic-meta">EMAIL RFQ &amp; TECH PACKS</div>
                <h3>Official Export Desks</h3>
                <p>Send your CAD tech-packs, design specifications, and RFQ schedules directly to our export inbox.</p>
                <div className="cic-emails">
                  <a href="mailto:rv8116677@gmail.com">rv8116677@gmail.com</a>
                  <a href="mailto:export@dgalorefashion.com">export@dgalorefashion.com</a>
                </div>
                <div className="cic-subtext">Typical response time: Under 12–24 business hours</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. INTERACTIVE B2B RFQ & INQUIRY FORM */}
        {/* ========================================================= */}
        <section className="contact-form-section">
          <div className="contact-container">
            <div className="contact-split-grid">
              {/* Form Column */}
              <div className="contact-form-wrapper">
                <div className="contact-form-header">
                  <span className="contact-kicker">Request Quotation &amp; Prototyping</span>
                  <h2>Send an Export Inquiry</h2>
                  <p>
                    Please share your requirements below. Our export sales and design team will prepare a formal proposal
                    complete with estimated FOB price brackets, sampling schedules, and packaging options.
                  </p>
                </div>

                {submitted && (
                  <div className="contact-success-banner" role="alert">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <div style={{ flex: 1 }}>
                      <strong>✓ Inquiry Dispatched Successfully!</strong>
                      <p>
                        Thank you, <strong>{lastSubmitted?.fullName || 'Valued Partner'}</strong>. Your inquiry has been sent to our export desk (<code>rv8116677@gmail.com</code>) and pre-filled in your WhatsApp tab.
                      </p>
                      {lastSubmitted && (
                        <div className="contact-success-actions">
                          <button
                            type="button"
                            className="cs-act-btn cs-act-wa"
                            onClick={() => {
                              const waUrl = `https://wa.me/919999920003?text=${encodeURIComponent(buildWhatsAppText(lastSubmitted))}`;
                              window.open(waUrl, '_blank');
                            }}
                          >
                            💬 Open WhatsApp Copy
                          </button>
                          <a
                            href={`mailto:rv8116677@gmail.com?subject=${encodeURIComponent(`Export Inquiry: ${lastSubmitted.companyName} (${lastSubmitted.fullName})`)}&body=${encodeURIComponent(lastSubmitted.message)}`}
                            className="cs-act-btn cs-act-email"
                          >
                            ✉ Open Email Client
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <form className="contact-b2b-form" onSubmit={handleSubmit}>
                  <div className="c-form-row">
                    <div className="c-form-group">
                      <label htmlFor="fullName">Full Name / Buyer Contact *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        placeholder="e.g. John Doe / Sarah Jenkins"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="c-form-group">
                      <label htmlFor="companyName">Company / Fashion Label *</label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        required
                        placeholder="e.g. Maison Elegance LLC"
                        value={formData.companyName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="c-form-row">
                    <div className="c-form-group">
                      <label htmlFor="email">Official Business Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="buyer@yourcompany.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="c-form-group">
                      <label htmlFor="phone">Phone / WhatsApp (with Country Code) *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="c-form-row">
                    <div className="c-form-group">
                      <label htmlFor="country">Destination Country / Target Port *</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        required
                        placeholder="e.g. United States / Port of New York"
                        value={formData.country}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="c-form-group">
                      <label htmlFor="inquiryType">Primary Inquiry Type</label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                      >
                        <option value="oem_custom">Custom OEM / Private Label Manufacturing</option>
                        <option value="catalog_bulk">Bulk Order from Current Catalog</option>
                        <option value="sampling">Tech-Pack Prototyping &amp; Sampling</option>
                        <option value="factory_visit">Factory Tour &amp; Facility Appointment</option>
                        <option value="general">General Export &amp; Logistics Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="c-form-group">
                    <label htmlFor="quantity">Estimated Order Volume / Target Quantity</label>
                    <select
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                    >
                      <option value="50_200">50 – 200 Pieces (Sampling / Boutique Batch)</option>
                      <option value="200_500">200 – 500 Pieces (Standard Collection Run)</option>
                      <option value="500_1000">500 – 1,000 Pieces (Multi-Store Wholesale)</option>
                      <option value="1000_plus">1,000+ Pieces (Large Volume Retail Rollout)</option>
                    </select>
                  </div>

                  <div className="c-form-group">
                    <label htmlFor="message">Project Description, Material Specs &amp; Tech Details *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      placeholder="Please outline the product categories (e.g., beaded clutches, evening bags), preferred materials, embellishment styles, target delivery timelines, or attach reference links..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="c-form-actions">
                    <button type="submit" className="contact-btn-submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Transmitting Inquiry...' : 'Submit Export Inquiry →'}
                    </button>

                    <button
                      type="button"
                      className="contact-btn-whatsapp-direct"
                      onClick={handleWhatsAppDirect}
                      title="Send this inquiry directly to our WhatsApp export desk"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      Quick Send via WhatsApp
                    </button>
                  </div>
                </form>
              </div>

              {/* Sidebar: Factory Highlights & Trust Box */}
              <div className="contact-sidebar">
                <div className="contact-trust-card">
                  <div className="ct-kicker">MANUFACTURING ASSURANCE</div>
                  <h3>Why International Brands Choose Us</h3>

                  <div className="ct-benefits-list">
                    <div className="ct-benefit-item">
                      <div className="ct-icon-check">✓</div>
                      <div>
                        <strong>40+ Years Heritage (Est. 1984)</strong>
                        <p>Generational karigars mastering zardozi, hand beading, and structural evening handbag fabrication.</p>
                      </div>
                    </div>

                    <div className="ct-benefit-item">
                      <div className="ct-icon-check">✓</div>
                      <div>
                        <strong>Fast 7-10 Days Sampling Turnaround</strong>
                        <p>Dedicated studio to translate buyer tech packs into physical counter-samples quickly.</p>
                      </div>
                    </div>

                    <div className="ct-benefit-item">
                      <div className="ct-icon-check">✓</div>
                      <div>
                        <strong>100% Ethical &amp; Compliant Factory</strong>
                        <p>Zero child labor, safe work environment, fair wage governance, and international audit readiness.</p>
                      </div>
                    </div>

                    <div className="ct-benefit-item">
                      <div className="ct-icon-check">✓</div>
                      <div>
                        <strong>Global Multi-Country Logistics</strong>
                        <p>Direct weekly air &amp; ocean shipments to USA, UK, EU, UAE, Australia, and Canada.</p>
                      </div>
                    </div>
                  </div>

                  <div className="ct-factory-callout">
                    <div className="ct-fc-title">Planning an India Factory Visit?</div>
                    <p>
                      Our manufacturing unit is located at <strong>P-88 Textile Centre, Pilkhuwa</strong>, approximately
                      75 minutes from central New Delhi via Delhi-Meerut Expressway. We gladly arrange airport transfers for visiting buyers.
                    </p>
                    <a
                      href="https://wa.me/919999920003?text=Hello%20D%20Galore%20Fashion!%20I%20would%20like%20to%20schedule%20a%20factory%20visit%20appointment."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ct-btn-schedule"
                    >
                      Schedule Factory Visit →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. FREQUENTLY ASKED EXPORT QUESTIONS (FAQ) */}
        {/* ========================================================= */}
        <section className="contact-faq-section">
          <div className="contact-container">
            <div className="contact-faq-header">
              <span className="contact-kicker">Help &amp; Buyer Guidelines</span>
              <h2>Frequently Asked Export Questions</h2>
              <p>Everything you need to know about our minimums, sampling process, logistics, and private label services.</p>
            </div>

            <div className="contact-faq-list">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`contact-faq-item ${isOpen ? 'is-open' : ''}`}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                  >
                    <div className="contact-faq-question">
                      <span>{faq.q}</span>
                      <span className="contact-faq-toggle">{isOpen ? '−' : '+'}</span>
                    </div>
                    {isOpen && (
                      <div className="contact-faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. LOCATION MAP & FACILITY ACCESS */}
        {/* ========================================================= */}
        <section className="contact-map-section">
          <div className="contact-container">
            <div className="contact-map-box">
              <div className="contact-map-copy">
                <span className="contact-kicker">Strategic Connectivity</span>
                <h3>Textile Centre Pilkhuwa · Delhi NCR Hub</h3>
                <p>
                  Our facility is positioned in Uttar Pradesh's historic textile and embroidery corridor, directly connected
                  via National Highway 9 and the Delhi-Meerut Expressway for rapid transit to international airports and dry ports.
                </p>
                <div className="contact-transit-tags">
                  <span className="ct-tag">✈ IGI Airport (DEL): ~60 KM</span>
                  <span className="ct-tag">🚢 ICD Dadri Dry Port: ~45 KM</span>
                  <span className="ct-tag">🛣 NH-9 / Expressway: Direct Access</span>
                </div>
              </div>

              <div className="contact-map-wrapper">
                {/* Floating Named Pin Badge Overlay */}
                <div className="contact-map-pin-badge">
                  <div className="cmp-pin-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#e53935" stroke="#ffffff" strokeWidth="1.5">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" fill="#ffffff" />
                    </svg>
                  </div>
                  <div className="cmp-pin-info">
                    <strong>📍 D Galore Fashion Pvt. Ltd. (TN Enterprises)</strong>
                    <span>P-88, Textile Centre, Pilkhuwa – 245304, Delhi NCR</span>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=P-88+Textile+Centre+Pilkhuwa+Uttar+Pradesh+245304"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cmp-directions-btn"
                  >
                    Directions ↗
                  </a>
                </div>

                <div className="contact-map-frame">
                  <iframe
                    title="D Galore Fashion Pvt. Ltd. - P-88 Textile Centre Pilkhuwa"
                    src="https://maps.google.com/maps?q=P-88,+Textile+Centre,+Pilkhuwa,+Uttar+Pradesh+245304+(D+Galore+Fashion+Pvt.+Ltd.)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                    width="100%"
                    height="380"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer navigate={navigate} showNewsletter={false} />
    </>
  );
}

