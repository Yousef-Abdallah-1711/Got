import focus from '@alpinejs/focus';
import Alpine from 'alpinejs';
import registerEarlyAccessForm from './early-access-form.js';

window.Alpine = Alpine;

Alpine.plugin(focus);
registerEarlyAccessForm(Alpine);

Alpine.data('gotThemeToggle', () => ({
  theme: document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',

  get nextTheme() {
    return this.theme === 'dark' ? 'light' : 'dark';
  },

  toggle() {
    this.theme = this.nextTheme;
    document.documentElement.dataset.theme = this.theme;

    try {
      window.localStorage.setItem('got-theme', this.theme);
    } catch {
      // Storage can be disabled; the current page still uses the selected theme.
    }
  },
}));

Alpine.data('gotNavigation', () => ({
  menuOpen: false,

  toggleMenu() {
    if (this.menuOpen) {
      this.closeMenu();
      return;
    }

    this.menuOpen = true;
    this.$nextTick(() => {
      window.requestAnimationFrame(() => {
        document.querySelector('#got-mobile-navigation button:not([disabled]), #got-mobile-navigation a[href]')?.focus();
      });
    });
  },

  closeMenu() {
    if (!this.menuOpen) return;

    this.menuOpen = false;
    this.$nextTick(() => {
      window.requestAnimationFrame(() => document.querySelector('#got-mobile-menu-trigger')?.focus());
    });
  },
}));

Alpine.data('gotAnnouncementBar', (serializedMessages) => ({
  messages: [],
  activeIndex: 0,
  reducedMotion: false,
  hovered: false,
  keyboardFocused: false,
  manuallyPaused: false,
  timer: null,
  motionQuery: null,
  motionChangeHandler: null,

  get activeMessage() {
    return this.messages[this.activeIndex] || { text: '' };
  },

  get paused() {
    return this.reducedMotion || this.hovered || this.keyboardFocused || this.manuallyPaused;
  },

  init() {
    try {
      const parsed = JSON.parse(serializedMessages || '[]');
      this.messages = Array.isArray(parsed)
        ? parsed.filter((message) => message && typeof message.text === 'string' && message.text.trim())
        : [];
    } catch {
      this.messages = [];
    }

    this.motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)') || null;
    this.reducedMotion = Boolean(this.motionQuery?.matches);
    this.motionChangeHandler = (event) => this.setReducedMotion(event);

    if (this.motionQuery?.addEventListener) {
      this.motionQuery.addEventListener('change', this.motionChangeHandler);
    } else {
      this.motionQuery?.addListener?.(this.motionChangeHandler);
    }

    if (this.messages.length > 1 && !this.reducedMotion) {
      this.timer = window.setInterval(() => {
        if (!this.paused) {
          this.activeIndex = (this.activeIndex + 1) % this.messages.length;
        }
      }, 4500);
    }
  },

  destroy() {
    if (this.timer !== null) window.clearInterval(this.timer);
    if (this.motionQuery?.removeEventListener) {
      this.motionQuery.removeEventListener('change', this.motionChangeHandler);
    } else {
      this.motionQuery?.removeListener?.(this.motionChangeHandler);
    }
  },

  setReducedMotion(event) {
    this.reducedMotion = event.matches;

    if (this.reducedMotion && this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    } else if (!this.reducedMotion && this.messages.length > 1 && this.timer === null) {
      this.timer = window.setInterval(() => {
        if (!this.paused) {
          this.activeIndex = (this.activeIndex + 1) % this.messages.length;
        }
      }, 4500);
    }
  },

  toggleManualPause() {
    this.manuallyPaused = !this.manuallyPaused;
  },

  onFocusOut(event) {
    this.keyboardFocused = event.currentTarget.contains(event.relatedTarget);
  },
}));

Alpine.data('gotCartDrawer', () => ({
  open: false,
  previouslyFocused: null,

  show() {
    if (this.open) return;

    this.previouslyFocused = document.activeElement;
    this.open = true;
    this.$nextTick(() => this.$refs.closeButton?.focus());
  },

  close() {
    if (!this.open) return;

    this.open = false;
    this.$nextTick(() => this.previouslyFocused?.focus?.());
  },
}));

Alpine.start();
