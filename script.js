const heroSlides = document.querySelectorAll('.hero-slide');
const heroPrev = document.querySelector('.hero-nav.prev');
const heroNext = document.querySelector('.hero-nav.next');
const heroProgressFill = document.getElementById('heroProgressFill');
const currentSlideNum = document.getElementById('currentSlideNum');

if (heroSlides.length > 0) {
  let currentSlide = 0;

  const updateHeroSlide = () => {
    heroSlides.forEach(slide => {
      slide.classList.remove('active');
    });

    heroSlides[currentSlide].classList.add('active');

    if (currentSlideNum) {
      currentSlideNum.innerText = `0${currentSlide + 1}`;
    }

    if (heroProgressFill) {
      const percentage = ((currentSlide + 1) / heroSlides.length) * 100;
      heroProgressFill.style.width = `${percentage}%`;
    }
  };

  heroNext.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    updateHeroSlide();
  });

  heroPrev.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    updateHeroSlide();
  });

  setInterval(() => {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    updateHeroSlide();
  }, 5000);

  updateHeroSlide();
}

// New Arrivals Carousel Logic
const arrCards = document.querySelectorAll('.arrival-card');
const arrPrev = document.getElementById('arrPrev');
const arrNext = document.getElementById('arrNext');
const totalArrCards = arrCards.length;
let arrIndex = 2; // start with middle card active

const updateArrivals = () => {
  arrCards.forEach(card => {
    card.className = 'arrival-card'; // reset all classes
  });

  const prevIndex = (arrIndex - 1 + totalArrCards) % totalArrCards;
  const nextIndex = (arrIndex + 1) % totalArrCards;
  const prevOuterIndex = (arrIndex - 2 + totalArrCards) % totalArrCards;
  const nextOuterIndex = (arrIndex + 2) % totalArrCards;

  arrCards[arrIndex].classList.add('active');
  arrCards[prevIndex].classList.add('prev');
  arrCards[nextIndex].classList.add('next');
  arrCards[prevOuterIndex].classList.add('prev-outer');
  arrCards[nextOuterIndex].classList.add('next-outer');

  // Update modern pagination
  const paginationContainer = document.getElementById('arrPagination');
  if (paginationContainer) {
    const pageItems = paginationContainer.querySelectorAll('.page-item');
    const pageLine = paginationContainer.querySelector('.page-line');

    // Remove all active classes
    pageItems.forEach(item => item.classList.remove('active'));

    // Set active class and move the line
    if (pageItems[arrIndex]) {
      pageItems[arrIndex].classList.add('active');
      // Move the line immediately after the active item
      paginationContainer.insertBefore(pageLine, pageItems[arrIndex].nextSibling);
    }
  }
};

if (arrPrev && arrNext && totalArrCards > 0) {
  arrNext.addEventListener('click', () => {
    arrIndex = (arrIndex + 1) % totalArrCards;
    updateArrivals();
  });

  arrPrev.addEventListener('click', () => {
    arrIndex = (arrIndex - 1 + totalArrCards) % totalArrCards;
    updateArrivals();
  });

  // Add click to side cards to make them active
  arrCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (!card.classList.contains('active')) {
        arrIndex = index;
        updateArrivals();
      }
    });
  });

  // Add click to pagination items
  const pageItems = document.querySelectorAll('#arrPagination .page-item');
  pageItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      arrIndex = index;
      updateArrivals();
    });
  });

  updateArrivals();
}

// Simple Testimonial Slider Logic (Visual toggle for demo)
const testCards = document.querySelector('.testimonial-cards');
const testPrev = document.querySelector('.testimonial-carousel .prev');
const testNext = document.querySelector('.testimonial-carousel .next');

if (testCards && testPrev && testNext) {
  testNext.addEventListener('click', () => {
    testCards.style.transform = 'translateX(-20px)';
    setTimeout(() => {
      testCards.style.transform = 'translateX(0)';
      // in a real app, we would swap data here
    }, 300);
  });

  testPrev.addEventListener('click', () => {
    testCards.style.transform = 'translateX(20px)';
    setTimeout(() => {
      testCards.style.transform = 'translateX(0)';
    }, 300);
  });
}

// Style It Your Way Auto Slider
const swTabs = document.querySelectorAll('#swTabs .sw-tab');
const swCardsContainer = document.getElementById('swCards');
const swDots = document.querySelectorAll('#swDots .dot');

if (swTabs.length > 0 && swCardsContainer && swDots.length > 0) {
  let swIndex = 0;
  const totalSwItems = swTabs.length;
  let swInterval;

  const updateSwSlider = () => {
    swTabs.forEach(tab => tab.classList.remove('active'));
    swDots.forEach(dot => dot.classList.remove('active'));

    swTabs[swIndex].classList.add('active');
    swDots[swIndex].classList.add('active');

    // Slide cards container
    swCardsContainer.style.transform = `translateX(-${swIndex * 100}%)`;
  };

  const startSwInterval = () => {
    clearInterval(swInterval);
    swInterval = setInterval(() => {
      swIndex = (swIndex + 1) % totalSwItems;
      updateSwSlider();
    }, 4000); // 4 seconds
  };

  // Add click handlers for manual control
  swTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      swIndex = index;
      updateSwSlider();
      startSwInterval();
    });
  });

  swDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      swIndex = index;
      updateSwSlider();
      startSwInterval();
    });
  });

  // Init
  startSwInterval();
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
  });
}

// Quick View Modal Logic
window.openModal = (imgSrc, title) => {
  if (typeof window.__hpOpenQuickView === 'function') {
    window.__hpOpenQuickView(imgSrc, title);
    return;
  }
  const qvModal = document.getElementById('qvModal');
  const qvProductImg = document.getElementById('qvProductImg');
  const qvProductTitle = document.getElementById('qvProductTitle');
  if (qvModal && qvProductImg && qvProductTitle) {
    qvProductImg.src = imgSrc;
    qvProductTitle.innerText = title;
    qvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

const qvModal = document.getElementById('qvModal');
const qvCloseBtn = document.getElementById('qvCloseBtn');

const closeModal = () => {
  if (qvModal) qvModal.classList.remove('active');
  document.body.style.overflow = '';
};

if (qvCloseBtn) qvCloseBtn.addEventListener('click', closeModal);

if (qvModal) {
  qvModal.addEventListener('click', (e) => {
    if (e.target === qvModal) {
      closeModal();
    }
  });
}

// Global safety listener for Escape key to unlock scroll and close any active overlays
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    const mailModal = document.getElementById('mailModal');
    const mailModalOverlay = document.getElementById('mailModalOverlay');
    if (mailModal) mailModal.classList.remove('active');
    if (mailModalOverlay) mailModalOverlay.classList.remove('active');
    const wishlistDrawer = document.getElementById('wishlistDrawer');
    const wishlistOverlay = document.getElementById('wishlistOverlay');
    if (wishlistDrawer) wishlistDrawer.classList.remove('active');
    if (wishlistOverlay) wishlistOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Wishlist Logic
let wishlist = JSON.parse(localStorage.getItem('jc_wishlist')) || [];
const wishlistBadge = document.getElementById('wishlistBadge');
const wishlistItemsContainer = document.getElementById('wishlistItems');
const btnWishlist = document.querySelector('.qv-btn-wishlist');
const wishlistDrawer = document.getElementById('wishlistDrawer');
const wishlistOverlay = document.getElementById('wishlistOverlay');
const wishlistToggle = document.getElementById('wishlistToggle');
const wishlistCloseBtn = document.getElementById('wishlistCloseBtn');
const btnEnquireAll = document.getElementById('btnEnquireAll');

if (wishlistToggle) {
  wishlistToggle.addEventListener('click', (e) => {
    e.preventDefault();
    if (wishlistDrawer) wishlistDrawer.classList.add('active');
    if (wishlistOverlay) wishlistOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

if (wishlistCloseBtn) {
  wishlistCloseBtn.addEventListener('click', () => {
    if (wishlistDrawer) wishlistDrawer.classList.remove('active');
    if (wishlistOverlay) wishlistOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

if (wishlistOverlay) {
  wishlistOverlay.addEventListener('click', () => {
    if (wishlistDrawer) wishlistDrawer.classList.remove('active');
    if (wishlistOverlay) wishlistOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

if (btnEnquireAll) {
  btnEnquireAll.addEventListener('click', () => {
    alert('Thank you! We have received your enquiry for all saved items.');
    if (wishlistDrawer) wishlistDrawer.classList.remove('active');
    if (wishlistOverlay) wishlistOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

const updateWishlistUI = () => {
  if (wishlistBadge) wishlistBadge.innerText = wishlist.length;

  if (!wishlistItemsContainer) return;

  if (wishlist.length === 0) {
    wishlistItemsContainer.innerHTML = '<div class="wishlist-empty">Your wishlist is empty.</div>';
    return;
  }

  let html = '';
  wishlist.forEach((item, index) => {
    html += `
      <div class="wishlist-item" data-index="${index}">
        <div class="wishlist-item-img">
          <img src="${item.imgSrc}" alt="${item.title}">
        </div>
        <div class="wishlist-item-details">
          <div class="wishlist-item-title">${item.title}</div>
          <div class="wishlist-item-subtitle">Essential Components</div>
          <div class="wishlist-item-actions">
            <button class="wishlist-item-quote" onclick="openWishlistItem(${index}, event)">Get Quote</button>
            <button class="wishlist-item-remove" onclick="removeFromWishlist(${index}, event)">Remove</button>
          </div>
        </div>
      </div>
    `;
  });

  wishlistItemsContainer.innerHTML = html;
};

window.openWishlistItem = (index, event) => {
  if (event) event.stopPropagation();
  const item = wishlist[index];
  if (typeof window.openModal === 'function') {
    window.openModal(item.imgSrc, item.title);
    if (wishlistDrawer) wishlistDrawer.classList.remove('active');
    if (wishlistOverlay) wishlistOverlay.classList.remove('active');
  }
};

window.removeFromWishlist = (index, event) => {
  event.stopPropagation();
  wishlist.splice(index, 1);
  localStorage.setItem('jc_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
};

if (btnWishlist) {
  btnWishlist.addEventListener('click', () => {
    const imgSrc = qvProductImg.src;
    const title = qvProductTitle.innerText;

    const exists = wishlist.find(item => item.title === title && item.imgSrc === imgSrc);

    if (!exists) {
      wishlist.push({ imgSrc, title });
      localStorage.setItem('jc_wishlist', JSON.stringify(wishlist));
      updateWishlistUI();

      const originalText = btnWishlist.innerHTML;
      btnWishlist.innerHTML = 'ADDED!';
      setTimeout(() => {
        btnWishlist.innerHTML = originalText;
        if (qvModal) {
          qvModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }, 600); // Popup closes after 600ms
    } else {
      const originalText = btnWishlist.innerHTML;
      btnWishlist.innerHTML = 'ALREADY SAVED';
      setTimeout(() => {
        btnWishlist.innerHTML = originalText;
        if (qvModal) {
          qvModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }, 600);
    }
  });
}

updateWishlistUI();

// Mail Modal Logic
const mailModal = document.getElementById('mailModal');
const mailModalOverlay = document.getElementById('mailModalOverlay');
const openMailBtn = document.getElementById('openMailFormBtn');
const closeMailBtn = document.getElementById('closeMailModalBtn');
const mailContactForm = document.getElementById('mailContactForm');

if (openMailBtn && mailModal && mailModalOverlay && closeMailBtn) {
  const openMailModal = () => {
    mailModal.classList.add('active');
    mailModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMailModal = () => {
    mailModal.classList.remove('active');
    mailModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  openMailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openMailModal();
  });

  closeMailBtn.addEventListener('click', closeMailModal);
  mailModalOverlay.addEventListener('click', closeMailModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mailModal.classList.contains('active')) {
      closeMailModal();
    }
  });

  // Handle Form Submission
  if (mailContactForm) {
    mailContactForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent page reload

      const formData = new FormData(mailContactForm);
      const fullname = formData.get('fullname') || '';
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || '';
      const product = formData.get('product') || 'General Collection';
      const city = formData.get('city') || '';
      const description = formData.get('description') || '';

      const submitBtn = mailContactForm.querySelector('.btn-submit-mail');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Enquiry →';
      if (submitBtn) {
        submitBtn.innerHTML = "Transmitting...";
        submitBtn.disabled = true;
      }

      // Format WhatsApp text
      const waText = `Hello D Galore Fashion!\n\nI am sending an inquiry from your website:\n• Full Name: ${fullname}\n• Email: ${email}\n• Phone: ${phone}\n• Product Interest: ${product}\n• City/Country: ${city}\n• Details: ${description}`;

      try {
        // Send email via FormSubmit AJAX to rv8116677@gmail.com
        await fetch('https://formsubmit.co/ajax/rv8116677@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: fullname,
            email: email,
            phone: phone,
            productInterest: product,
            cityCountry: city,
            description: description,
            _replyto: email,
            _subject: `New B2B Quick Enquiry from ${fullname} (${city})`,
            _template: 'table',
            _captcha: 'false'
          })
        }).catch((err) => {
          console.warn('FormSubmit notice:', err);
        });
      } catch (err) {
        console.warn('Enquiry notice:', err);
      } finally {
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }

        // Open WhatsApp in new tab with the pre-filled enquiry
        const waUrl = `https://wa.me/919999920003?text=${encodeURIComponent(waText)}`;
        window.open(waUrl, '_blank');

        alert(`Thank you, ${fullname}! Your enquiry has been received and forwarded to our export desk and WhatsApp.`);
        mailContactForm.reset();
        closeMailModal();
      }
    });
  }
}
