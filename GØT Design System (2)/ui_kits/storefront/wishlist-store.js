// Guest wishlist persistence for the static storefront preview.
// Store canonical product IDs only; product details always come from the current catalog.
(function () {
  const key = 'got-kit-wish';

  function normalize(ids) {
    if (!Array.isArray(ids)) return [];
    return [...new Set(ids.filter(id => typeof id === 'string' && id.length > 0 && id.length <= 128 && id.trim() === id))];
  }

  function parse(raw) {
    if (typeof raw !== 'string' || !raw) return [];
    try { return normalize(JSON.parse(raw)); } catch (error) { return []; }
  }

  function read() {
    try { return parse(window.localStorage.getItem(key)); } catch (error) { return []; }
  }

  function save(ids) {
    try {
      window.localStorage.setItem(key, JSON.stringify(normalize(ids)));
      return true;
    } catch (error) {
      return false;
    }
  }

  window.GOT_WISHLIST = { key, normalize, parse, read, save };
})();
