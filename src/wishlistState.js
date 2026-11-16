// Unified B2B Wishlist / Inquiry Shortlist State & Helpers
const STORAGE_KEY = 'jc_wishlist';

export function getWishlist() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Error reading wishlist from localStorage:', err);
    return [];
  }
}

export function saveWishlist(items) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('dg_wishlist_updated', { detail: items }));
  } catch (err) {
    console.warn('Error writing wishlist to localStorage:', err);
  }
}

export function isItemInWishlist(itemOrTitle) {
  const list = getWishlist();
  const searchKey = typeof itemOrTitle === 'string' ? itemOrTitle : (itemOrTitle?.title || itemOrTitle?.id);
  if (!searchKey) return false;
  return list.some(
    (p) => p.title === searchKey || (p.id && p.id === searchKey)
  );
}

export function toggleWishlistItem(product) {
  if (!product || !product.title) return { added: false, count: 0 };
  const current = getWishlist();
  const existsIndex = current.findIndex(
    (p) => p.title === product.title || (p.id && product.id && p.id === product.id)
  );

  if (existsIndex >= 0) {
    // Remove item
    current.splice(existsIndex, 1);
    saveWishlist(current);
    showWishlistToast(`Removed "${product.title}" from shortlist`);
    return { added: false, count: current.length, item: product };
  } else {
    // Add item
    const newItem = {
      id: product.id || `dg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      title: product.title,
      imgSrc: product.imgSrc || product.img || product.image || '',
      category: product.category || 'Handcrafted Collection',
      itemCode: product.itemCode || 'DGF-CUSTOM',
      moq: product.moq || '50 Pcs',
      addedAt: new Date().toISOString()
    };
    current.push(newItem);
    saveWishlist(current);
    showWishlistToast(`Added "${product.title}" to inquiry shortlist! 💖`);
    return { added: true, count: current.length, item: newItem };
  }
}

export function removeFromWishlist(idOrTitle) {
  const current = getWishlist();
  const filtered = current.filter(
    (p) => p.id !== idOrTitle && p.title !== idOrTitle
  );
  saveWishlist(filtered);
  showWishlistToast('Item removed from shortlist');
}

export function clearWishlist() {
  saveWishlist([]);
  showWishlistToast('Wishlist cleared');
}

export function openWishlistDrawer() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('dg_open_wishlist'));
  }
}

export function closeWishlistDrawer() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('dg_close_wishlist'));
  }
}

export function showWishlistToast(message) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('dg_show_toast', { detail: { message } }));
  }
}

