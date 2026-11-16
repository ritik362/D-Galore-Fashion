import React, { useEffect, useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
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

// Company Quick Factsheet
const companyFactsheet = [
  { label: 'Company Legal Name', val: 'D Galore Fashion Pvt. Ltd.' },
  { label: 'Nature of Business', val: 'Manufacturer, Exporter & OEM / ODM Supplier' },
  { label: 'Year of Establishment', val: '1984 (40+ Years of Manufacturing Heritage)' },
  { label: 'Founders & Leadership', val: 'Mr. Devi Dass Verma (Founder) · Mr. Gopal Verma & Mr. Dilip Verma (Directors)' },
  { label: 'Registered Unit & Facility', val: 'P-88, Textile Centre, Pilkhuwa – 245304, Ghaziabad (Delhi NCR), UP, India' },
  { label: 'Specialized Product Lines', val: 'Handcrafted Beaded Bags, Evening Clutches, Fashion Accessories & Lifestyle Handicrafts' },
  { label: 'Artisan & Production Team', val: '120+ Master Karigars, Designers, QC Specialists & Craftsmen' },
  { label: 'Primary Export Destinations', val: 'USA, United Kingdom, European Union, UAE / Middle East & Australia' },
  { label: 'Compliance & Ethics', val: '100% Ethical Manufacturing, Fair Wages, Safe Working Environment, Zero Child Labor' },
  { label: 'Logistics Proximity', val: 'Strategic Delhi NCR Hub: 60 km to IGI International Airport & Inland Dry Ports' },
];

// Historical Corporate Milestones
const companyMilestones = [
  {
    year: '1984',
    badge: 'Inception',
    title: 'The Artisanal Foundation',
    desc: 'Founded by visionary master craftsman Mr. Devi Dass Verma in the historic textile hub of Pilkhuwa. Began as an artisan workshop rooted in handmade embroidery and uncompromised quality.',
  },
  {
    year: '2004',
    badge: 'Global Expansion',
    title: 'Venturing Into Global Export',
    desc: 'Officially launched direct international export operations, supplying high-grade handcrafted fashion accessories and evening bags to recognized overseas wholesalers, buying houses, and fashion labels.',
  },
  {
    year: '2010',
    badge: 'Next-Gen Leadership',
    title: 'Second Generation Evolution',
    desc: 'Mr. Gopal Verma & Mr. Dilip Verma stepped into active management, introducing modern design studios, digital sampling workflows, runway trend forecasting, and agile buyer communication.',
  },
  {
    year: '2018',
    badge: 'Infrastructure',
    title: 'Modern Facility at Textile Centre',
    desc: 'Expanded production to an integrated manufacturing plant at P-88 Textile Centre, Pilkhuwa, establishing a dedicated sampling lab, multi-tier QA department, and climate-controlled packaging bay.',
  },
  {
    year: '2024+',
    badge: 'Today & Beyond',
    title: 'Sustainable Global Partner',
    desc: 'Today partnering with premier international private labels and retail brands worldwide, blending India’s centuries-old handcraft legacy with modern sustainable and compliant production.',
  },
];

// 5 Key Manufacturing Infrastructure Units
const manufacturingUnits = [
  {
    num: '01',
    title: 'In-House Design & Prototyping Studio',
    desc: 'Dedicated creative studio equipped for buyer tech-pack translation, CAD pattern making, mood board styling, and rapid physical sample development within 7 to 10 days.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Master Hand-Embroidery & Beading Section',
    desc: 'Generational artisans specialized in zardozi, aari, hand-sewn cut glass beads, bugle beads, delicate seed pearls, and crystal embellishments crafted with flawless precision.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Precision Stitching, Framing & Assembly',
    desc: 'Industrial-grade stitching bays, structured metal clutch frame mounting, durable inner lining fabrication, and edge-finishing engineered for luxury longevity.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Multi-Tier Quality Control & Lab Testing',
    desc: 'Strict 4-point quality inspection covering raw material testing, bead pull-strength tests, drop durability checks, hardware plating tests, and 100% metal/needle detection.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Export Packaging & Logistics Division',
    desc: 'Barcoding, buyer-specific retail tagging, moisture-barrier wrapping, and export-compliant carton packing with seamless dispatches through Delhi NCR dry ports and IGI Airport.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Ethical Workplace & Worker Welfare',
    desc: 'Committed to fair living wages, hygienic work conditions, safe and well-ventilated artisan halls, women empowerment, and strict adherence to anti-child-labor policies.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

// B2B OEM / Private Label Workflow Steps
const b2bWorkflow = [
  {
    step: 'Step 01',
    title: 'Buyer Tech Pack & Inquiry',
    desc: 'You share your concept sketches, CAD designs, target price points, or physical references with our export team.',
  },
  {
    step: 'Step 02',
    title: 'Material Sourcing & Sampling',
    desc: 'Our design studio curates custom beads, fabrics, swatches, and produces approval prototypes within 7 to 10 days.',
  },
  {
    step: 'Step 03',
    title: 'Approval & Bulk Production',
    desc: 'Upon final sample sign-off, our master karigars commence scheduled batch crafting with transparent milestone updates.',
  },
  {
    step: 'Step 04',
    title: 'Rigorous 100% Quality Inspection',
    desc: 'Every completed unit passes 4-tier QA checks for dimensions, stitch density, bead lock security, and metal detection.',
  },
  {
    step: 'Step 05',
    title: 'Custom Packing & Worldwide Delivery',
    desc: 'Custom branded packing, barcoding, and export logistics via Air/Sea freight directly to your international warehouses.',
  },
];

export default function AboutUs({ navigate }) {
  const [activeTab, setActiveTab] = useState('profile');

  const scrollToContact = (e) => {
    if (e) e.preventDefault();
    const el = document.querySelector('.footer') || document.getElementById('facility');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header activePage="about" navigate={navigate} />

      <main className="about-page">
        {/* ========================================================= */}
        {/* 1. CORPORATE HEADER BANNER & BREADCRUMB */}
        {/* ========================================================= */}
        <section className="ab-top-banner">
          <div className="ab-container">
            <div className="ab-banner-inner">
              <span className="ab-banner-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Corporate Profile &amp; Export Manufacturing House
              </span>

              <h1 className="ab-banner-title">
                About <em>D Galore Fashion Pvt. Ltd.</em>
              </h1>

              <h2 className="ab-banner-subtitle">
                Premier Indian Manufacturer &amp; Exporter of Handcrafted Fashion Accessories Since 1984
              </h2>

              <p className="ab-banner-desc">
                From an artisan handcraft foundation established four decades ago to an internationally recognized
                manufacturing partner trusted by global fashion houses, retail chains, and private boutique labels worldwide.
              </p>

              <div className="ab-banner-breadcrumb">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <span className="ab-bc-sep">/</span>
                <span className="ab-bc-curr">Company Profile (About Us)</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. CORPORATE OVERVIEW (COMPANY PROFILE & CREDENTIALS) */}
        {/* ========================================================= */}
        <section className="ab-corp-hero">
          <div className="ab-container">
            <div className="ab-corp-grid">
              <div className="ab-corp-intro">
                <div className="ab-kicker-wrap">
                  <span className="ab-kicker">Corporate Overview</span>
                </div>
                <h2 className="ab-corp-heading">
                  Four Decades of Trust, Craftsmanship &amp; <em>Global Manufacturing Excellence.</em>
                </h2>
                <p className="ab-corp-text">
                  <strong>D Galore Fashion Pvt. Ltd.</strong> (operating with sister entity <em>TN Enterprises</em>) is an established
                  Government-recognized export manufacturing company situated in the renowned textile manufacturing hub of
                  <strong> Pilkhuwa, Ghaziabad (Delhi NCR), India</strong>.
                </p>
                <p className="ab-corp-text">
                  Since its founding in <strong>1984</strong> by <strong>Mr. Devi Dass Verma</strong>, our organization has remained
                  dedicated to one singular objective: connecting authentic, centuries-old Indian hand-embroidery and artisanal
                  craftsmanship with modern global fashion demands, stringent international quality compliance, and competitive export pricing.
                </p>
                <p className="ab-corp-text">
                  Today, under the dynamic leadership of the second generation — <strong>Mr. Gopal Verma and Mr. Dilip Verma</strong> —
                  the company operates a full-scale integrated facility offering complete end-to-end solutions: from custom tech-pack prototyping,
                  hand-beading, structured assembly, multi-tier inspection, to seamless door-to-port international logistics across 15+ countries.
                </p>

                <div className="ab-corp-highlights">
                  <div className="ab-hl-item">
                    <span className="ab-hl-check">✓</span>
                    <div>
                      <strong>100% In-House Sampling &amp; Manufacturing</strong>
                      <p>Complete control over raw material sourcing, artisan crafting, and delivery schedules.</p>
                    </div>
                  </div>
                  <div className="ab-hl-item">
                    <span className="ab-hl-check">✓</span>
                    <div>
                      <strong>B2B Private Label &amp; OEM Specialist</strong>
                      <p>Custom designs, buyer branding, low flexible MOQs, and scalable volume production.</p>
                    </div>
                  </div>
                  <div className="ab-hl-item">
                    <span className="ab-hl-check">✓</span>
                    <div>
                      <strong>Zero Compromise on Quality &amp; Social Compliance</strong>
                      <p>Sedex / ethical norms aligned, fair artisan wages, safe workshops, zero child labor.</p>
                    </div>
                  </div>
                </div>

                <div className="ab-corp-actions">
                  <a href="#factsheet" className="ab-btn-primary">
                    View Company Factsheet ↓
                  </a>
                  <button type="button" className="ab-btn-secondary" onClick={scrollToContact}>
                    Connect with Export Desk →
                  </button>
                </div>
              </div>

              {/* Right Side Corporate Visual Showcase */}
              <div className="ab-corp-media">
                <div className="ab-corp-media-frame">
                  <img
                    src={assetUrl("img/img1.png")}
                    alt="Artisan hand-crafting beaded accessories at D Galore Fashion"
                    className="ab-corp-main-img"
                  />
                  <div className="ab-corp-floating-badge">
                    <span className="ab-badge-gold-star">✦</span>
                    <div>
                      <strong>Est. 1984</strong>
                      <small>40+ Years In Business</small>
                    </div>
                  </div>
                  <div className="ab-corp-location-chip">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>Pilkhuwa (Delhi NCR), India</span>
                  </div>
                </div>

                {/* Corporate Key Stats Under Image */}
                <div className="ab-media-stats">
                  <div className="ab-mstat">
                    <span className="ab-mstat-num">1984</span>
                    <span className="ab-mstat-lbl">Year Established</span>
                  </div>
                  <div className="ab-mstat">
                    <span className="ab-mstat-num">120+</span>
                    <span className="ab-mstat-lbl">Craftsmen &amp; Staff</span>
                  </div>
                  <div className="ab-mstat">
                    <span className="ab-mstat-num">15+</span>
                    <span className="ab-mstat-lbl">Countries Served</span>
                  </div>
                  <div className="ab-mstat">
                    <span className="ab-mstat-num">100%</span>
                    <span className="ab-mstat-lbl">Export Quality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. OFFICIAL COMPANY FACTSHEET (CORPORATE DATA TABLE) */}
        {/* ========================================================= */}
        <section className="ab-factsheet-section" id="factsheet">
          <div className="ab-container">
            <div className="ab-sec-header">
              <span className="ab-kicker">Official Company Credentials</span>
              <h2 className="ab-sec-title">
                Corporate Factsheet &amp; <em>Business Profile</em>
              </h2>
              <p className="ab-sec-desc">
                Key registration details, operational benchmarks, leadership profiles, and trade specifications of
                <strong> D Galore Fashion Pvt. Ltd.</strong>
              </p>
            </div>

            <div className="ab-factsheet-wrapper">
              <div className="ab-factsheet-card">
                <div className="ab-factsheet-header">
                  <div className="ab-fsh-left">
                    <div className="ab-fsh-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                    <div>
                      <h3>D Galore Fashion Pvt. Ltd.</h3>
                      <p>Corporate Registration &amp; Operational Factsheet</p>
                    </div>
                  </div>
                  <div className="ab-fsh-status">
                    <span className="ab-status-dot" /> Verified Manufacturer &amp; Exporter
                  </div>
                </div>

                <div className="ab-factsheet-table">
                  {companyFactsheet.map((item, idx) => (
                    <div key={idx} className="ab-table-row">
                      <div className="ab-col-label">
                        <span className="ab-bullet">✦</span>
                        {item.label}
                      </div>
                      <div className="ab-col-val">{item.val}</div>
                    </div>
                  ))}
                </div>

                <div className="ab-factsheet-footer">
                  <p>
                    <strong>Trade Inquiries:</strong> We welcome official RFQs, private-label sampling requests,
                    and wholesale order consultations from global importers and brand representatives.
                  </p>
                  <button type="button" className="ab-btn-primary" onClick={scrollToContact}>
                    Request Corporate Company Profile (PDF) →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. MISSION, VISION & GUIDING VALUES */}
        {/* ========================================================= */}
        <section className="ab-mission-vision-section">
          <div className="ab-container">
            <div className="ab-mv-grid">
              <div className="ab-mv-card ab-mv-mission">
                <div className="ab-mv-top">
                  <span className="ab-mv-tag">OUR MISSION</span>
                  <div className="ab-mv-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="22" y1="12" x2="18" y2="12" />
                      <line x1="6" y1="12" x2="2" y2="12" />
                      <line x1="12" y1="6" x2="12" y2="2" />
                      <line x1="12" y1="22" x2="12" y2="18" />
                    </svg>
                  </div>
                </div>
                <h3>Preserve Heritage, Deliver Precision</h3>
                <p>
                  To preserve and elevate authentic Indian hand-embroidery and artisanal skills by bridging timeless craftsmanship
                  with contemporary global fashion aesthetics, ensuring strict export quality, ethical production environments,
                  and sustainable livelihoods for master artisans.
                </p>
                <div className="ab-mv-pillar-list">
                  <span>✦ Master Craftsmanship</span>
                  <span>✦ Artisanal Welfare</span>
                  <span>✦ Reliable Timelines</span>
                </div>
              </div>

              <div className="ab-mv-card ab-mv-vision">
                <div className="ab-mv-top">
                  <span className="ab-mv-tag">OUR VISION</span>
                  <div className="ab-mv-icon">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#c69d57" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                </div>
                <h3>The World's Trusted Craft Partner</h3>
                <p>
                  To be recognized across Europe, the Americas, Asia, and the Middle East as the most dependable, innovative,
                  and ethically responsible Indian manufacturing export partner for luxury fashion labels, global department stores,
                  and discerning boutique brands.
                </p>
                <div className="ab-mv-pillar-list">
                  <span>✦ Global Partnerships</span>
                  <span>✦ Trend Agility</span>
                  <span>✦ Sustainable Growth</span>
                </div>
              </div>
            </div>

            {/* Core Values Strip */}
            <div className="ab-values-card">
              <div className="ab-val-header">
                <h4>Core Principles That Guide Every Consignment</h4>
                <p>Rooted in family values established in 1984, our team operates with five non-negotiable standards:</p>
              </div>
              <div className="ab-val-row">
                <div className="ab-val-col">
                  <strong>01. Integrity &amp; Transparency</strong>
                  <p>Honest sampling, realistic lead times, and upfront commercial terms with no hidden surprises.</p>
                </div>
                <div className="ab-val-col">
                  <strong>02. Uncompromising Quality</strong>
                  <p>Multi-tier physical inspections from raw glass bead sourcing to the final boxed packaging.</p>
                </div>
                <div className="ab-val-col">
                  <strong>03. Respect for the Artisan</strong>
                  <p>Fair compensation, safe work conditions, and dignified support for the craft community.</p>
                </div>
                <div className="ab-val-col">
                  <strong>04. Innovation &amp; Agility</strong>
                  <p>Continuous trend research, custom CAD pattern prototyping, and adaptable minimum order quantities.</p>
                </div>
                <div className="ab-val-col">
                  <strong>05. Long-Term Partnerships</strong>
                  <p>We do not seek one-off transactions; we cultivate decades-long collaborative business alliances.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. COMPANY MILESTONES ROADMAP (1984 TO PRESENT) */}
        {/* ========================================================= */}
        <section className="ab-milestones-section">
          <div className="ab-container">
            <div className="ab-sec-header">
              <span className="ab-kicker">Four Decades of Growth</span>
              <h2 className="ab-sec-title">
                The Journey of <em>D Galore Fashion</em>
              </h2>
              <p className="ab-sec-desc">
                From a humble family handcraft workshop in 1984 to a globally recognized B2B export manufacturing powerhouse.
              </p>
            </div>

            <div className="ab-timeline-track">
              {companyMilestones.map((m, idx) => (
                <div key={idx} className="ab-timeline-node">
                  <div className="ab-tl-year-badge">
                    <span className="ab-tl-year">{m.year}</span>
                    <span className="ab-tl-tag">{m.badge}</span>
                  </div>
                  <div className="ab-tl-content">
                    <h4>{m.title}</h4>
                    <p>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. MANUFACTURING INFRASTRUCTURE & FACILITY CAPABILITIES */}
        {/* ========================================================= */}
        <section className="ab-infra-section">
          <div className="ab-container">
            <div className="ab-sec-header">
              <span className="ab-kicker">Manufacturing Powerhouse</span>
              <h2 className="ab-sec-title">
                Plant Infrastructure &amp; <em>Production Departments</em>
              </h2>
              <p className="ab-sec-desc">
                Our Pilkhuwa (Delhi NCR) manufacturing facility brings together traditional karigar craftsmanship
                with structured industrial export workflows.
              </p>
            </div>

            <div className="ab-infra-grid">
              {manufacturingUnits.map((unit) => (
                <div key={unit.num} className="ab-infra-card">
                  <div className="ab-infra-top">
                    <span className="ab-infra-num">{unit.num}</span>
                    <div className="ab-infra-icon">{unit.icon}</div>
                  </div>
                  <h4>{unit.title}</h4>
                  <p>{unit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. B2B / OEM PRIVATE LABEL MANUFACTURING WORKFLOW */}
        {/* ========================================================= */}
        <section className="ab-workflow-section">
          <div className="ab-container">
            <div className="ab-workflow-box">
              <div className="ab-sec-header" style={{ marginBottom: '36px' }}>
                <span className="ab-kicker">Collaborative Production Model</span>
                <h2 className="ab-sec-title">
                  How We Partner With <em>Global Fashion Brands</em>
                </h2>
                <p className="ab-sec-desc">
                  A transparent 5-step operational workflow designed to transform buyer sketches and inspirations into
                  commercially successful, flawless finished merchandise.
                </p>
              </div>

              <div className="ab-wf-steps-grid">
                {b2bWorkflow.map((item, index) => (
                  <div key={index} className="ab-wf-step-card">
                    <div className="ab-wf-step-pill">{item.step}</div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="ab-wf-cta-row">
                <div className="ab-wf-cta-info">
                  <strong>Looking for Custom Sampling or Private Label OEM?</strong>
                  <p>We work with international tech-packs, physical reference bags, custom Pantone swatches, and targeted FOB pricing.</p>
                </div>
                <button type="button" className="ab-btn-primary" onClick={scrollToContact}>
                  Initiate Sampling Project →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 8. LEADERSHIP & MANAGEMENT NOTE */}
        {/* ========================================================= */}
        <section className="ab-leadership-section">
          <div className="ab-container">
            <div className="ab-sec-header">
              <span className="ab-kicker">Guiding Leadership</span>
              <h2 className="ab-sec-title">
                Generations of <em>Dedication &amp; Governance</em>
              </h2>
            </div>

            <div className="ab-leaders-grid">
              <div className="ab-leader-card">
                <div className="ab-leader-role-tag">FOUNDING PATRIARCH (1984)</div>
                <h3>Mr. Devi Dass Verma</h3>
                <span className="ab-leader-title">Founder &amp; Master Craft Mentor</span>
                <p className="ab-leader-bio">
                  Laid the foundation of D Galore Fashion four decades ago with an unbending commitment to authenticity,
                  hand-craftsmanship, and client respect. His technical guidance on bead embroidery, fabric tension, and
                  artisan welfare remains our guiding compass.
                </p>
                <div className="ab-leader-quote">
                  “A business built on unwavering integrity, relentless quality, and honoring the artisan’s hand.”
                </div>
              </div>

              <div className="ab-leader-card">
                <div className="ab-leader-role-tag">EXECUTIVE DIRECTORS (2010 – PRESENT)</div>
                <h3>Mr. Gopal Verma &amp; Mr. Dilip Verma</h3>
                <span className="ab-leader-title">Managing Directors · Global Operations &amp; Strategy</span>
                <p className="ab-leader-bio">
                  Leading company modernization, technological integration, international export compliance,
                  and global brand partnerships. Under their stewardship, the company has expanded its footprint across
                  European, American, and Middle Eastern retail and boutique markets.
                </p>
                <div className="ab-leader-quote">
                  “We combine four decades of artisanal heritage with agile manufacturing and global customer service.”
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 9. MANUFACTURING FACILITY & LOGISTICS HUB */}
        {/* ========================================================= */}
        <section className="ab-facility-section" id="facility">
          <div className="ab-container">
            <div className="ab-facility-grid">
              <div className="ab-facility-copy">
                <span className="ab-kicker">Strategic Delhi NCR Location</span>
                <h3>Integrated Export Unit at Textile Centre Pilkhuwa</h3>
                <p>
                  From our custom-built manufacturing and sampling unit at <strong>P-88, Textile Centre, Pilkhuwa – 245304,
                  Ghaziabad, Uttar Pradesh, India</strong>, we coordinate end-to-end production and overseas freight.
                </p>
                <p>
                  Conveniently situated in the National Capital Region (Delhi NCR), our factory is strategically linked
                  to major national highways, domestic logistics hubs, and international shipment gateways.
                </p>

                <div className="ab-facility-address-box">
                  <h5>Registered Office &amp; Export Works</h5>
                  <address>
                    <strong>D Galore Fashion Pvt. Ltd.</strong> (TN Enterprises)<br />
                    P-88, Textile Centre, Pilkhuwa – 245304<br />
                    District Ghaziabad (Delhi NCR), Uttar Pradesh, India<br />
                    <span>Business Hours: Mon – Sat, 9:30 AM – 7:00 PM IST</span>
                  </address>
                </div>

                <div className="ab-facility-contacts">
                  <div className="ab-fc-item">
                    <strong>Export Desk:</strong>
                    <span>export@dgalorefashion.com / info@dgalorefashion.com</span>
                  </div>
                  <div className="ab-fc-item">
                    <strong>Direct Lines:</strong>
                    <span>+91 99999 20003</span>
                  </div>
                </div>
              </div>

              {/* Logistics & Connectivity Highlights Card */}
              <div className="ab-facility-card">
                <div className="ab-card-top-meta">
                  <span>Strategic Advantage · Delhi NCR</span>
                  <span>Export Ready</span>
                </div>

                <div className="ab-facility-bullets">
                  <div className="ab-f-bullet">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <div>
                      <h6>Direct Airport &amp; Sea Port Access</h6>
                      <p>Approx. 60 km from Indira Gandhi International Airport (DEL) &amp; Dadri/Patparganj Inland Container Depots (ICD) for swift air &amp; ocean dispatches.</p>
                    </div>
                  </div>

                  <div className="ab-f-bullet">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    <div>
                      <h6>Pilkhuwa Textile Heritage Heartland</h6>
                      <p>Deep regional access to generational master weavers, hand-printers, zardozi artisans, and specialty fabric mills.</p>
                    </div>
                  </div>

                  <div className="ab-f-bullet">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                    <div>
                      <h6>International Documentation Compliance</h6>
                      <p>Full IEC registration, GST compliance, certificate of origin facilitation, and authorized customs clearance documentation.</p>
                    </div>
                  </div>
                </div>

                <div className="ab-card-seal-row">
                  <small>40+ Years Legacy · Govt. Recognized Export House</small>
                  <strong>Global Shipments ↗</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 10. PARTNER / B2B CALL TO ACTION */}
        {/* ========================================================= */}
        <section className="ab-cta-banner">
          <div className="ab-container">
            <div className="ab-cta-box">
              <span className="ab-kicker">Initiate Partnership</span>
              <h3>Partner With India's Leading Handcraft Export House</h3>
              <p>
                Whether you are an international fashion house seeking an agile private-label manufacturer,
                an importer needing dependable bulk supply, or a luxury boutique launching a custom beaded collection —
                we are ready to bring your vision to life.
              </p>
              <div className="ab-cta-buttons">
                <button
                  type="button"
                  className="ab-btn-primary"
                  onClick={scrollToContact}
                >
                  Contact Our Export Team →
                </button>
                <a
                  href="/#product"
                  className="ab-btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    if (navigate) navigate('/product');
                    else window.location.href = '/product';
                  }}
                >
                  Browse Product Catalog ↗
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer navigate={navigate} showNewsletter={false} />
    </>
  );
}
