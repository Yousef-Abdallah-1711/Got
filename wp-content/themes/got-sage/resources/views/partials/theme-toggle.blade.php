<div class="got-theme-toggle" x-data="gotThemeToggle()">
  <button
    class="got-icon-button"
    type="button"
    aria-label="{{ esc_attr__('Switch to light mode', 'got-sage') }}"
    aria-pressed="false"
    x-bind:aria-label="'Switch to ' + nextTheme + ' mode'"
    x-bind:aria-pressed="String(theme === 'light')"
    x-on:click="toggle()"
  >
    <x-icon name="sun" x-show="theme === 'dark'" />
    <x-icon name="moon" x-show="theme === 'light'" />
    <span class="got-sr-only" x-text="'Switch to ' + nextTheme + ' mode'">{{ esc_html__('Switch to light mode', 'got-sage') }}</span>
  </button>
</div>
