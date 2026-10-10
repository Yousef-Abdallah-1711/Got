@php
  $mode = isset($mode) && in_array($mode, array('store', 'minimal', 'checkout'), true) ? $mode : 'store';
  $searchUrl = get_search_link();
  $wishlistUrl = home_url('/wishlist/');
  $accountUrl = function_exists('wc_get_page_permalink') ? wc_get_page_permalink('myaccount') : wp_login_url();
@endphp

<header
  class="got-header got-header--{{ esc_attr($mode) }}"
  data-header-mode="{{ esc_attr($mode) }}"
  @if ('store' === $mode)
    x-data="gotNavigation()"
    x-on:keydown.escape.window="closeMenu()"
  @endif
>
  <div class="got-header__inner">
    <div class="got-header__start">
      @if ('store' === $mode)
        <button
          class="got-icon-button got-mobile-menu-trigger"
          id="got-mobile-menu-trigger"
          type="button"
          aria-label="{{ esc_attr__('Open menu', 'got-sage') }}"
          aria-controls="got-mobile-navigation"
          aria-expanded="false"
          x-bind:aria-expanded="String(menuOpen)"
          x-on:click="toggleMenu()"
          x-ref="menuTrigger"
        >
          <x-icon name="menu" />
        </button>

        <nav class="got-desktop-navigation" aria-label="{{ esc_attr__('Primary', 'got-sage') }}">
          {!! wp_nav_menu(array(
            'theme_location' => 'primary_navigation',
            'container' => false,
            'fallback_cb' => false,
            'menu_class' => 'got-nav-list',
            'menu_id' => 'got-primary-navigation',
            'depth' => 1,
            'echo' => false,
          )) !!}
        </nav>
      @elseif ('checkout' === $mode)
        <span class="got-header__checkout-label got-eyebrow">{{ __('Secure checkout', 'got-sage') }}</span>
      @elseif ('minimal' === $mode)
        <nav class="got-header__minimal-socials" aria-label="{{ esc_attr__('Social media', 'got-sage') }}">
          <a href="https://www.instagram.com/got.official1/" aria-label="{{ esc_attr__('Instagram', 'got-sage') }}" rel="me noopener noreferrer">
            <x-icon name="instagram" class="got-header__social-icon" />
          </a>
          <a href="https://www.tiktok.com/@got.offical" rel="me noopener noreferrer">TikTok</a>
        </nav>
      @endif
    </div>

    <a class="got-header__wordmark" href="{{ esc_url(home_url('/')) }}" aria-label="{{ esc_attr__('GØT home', 'got-sage') }}">
      <x-wordmark />
    </a>

    <div class="got-header__utilities">
      @if ('store' === $mode)
        <x-icon-button icon="search" :label="__('Search', 'got-sage')" :href="$searchUrl" />
        <x-icon-button icon="heart" :label="__('Wishlist', 'got-sage')" :href="$wishlistUrl" />
        <span class="got-desktop-account">
          <x-icon-button icon="account" :label="__('Account', 'got-sage')" :href="$accountUrl" />
        </span>
      @endif

      @include('partials.theme-toggle')

      @if ('store' === $mode)
        <x-icon-button
          icon="bag"
          :label="__('Open cart', 'got-sage')"
          x-on:click="$dispatch('got-cart-open')"
        />
      @endif
    </div>
  </div>

  @if ('store' === $mode)
    <nav
      id="got-mobile-navigation"
      class="got-mobile-menu"
      aria-label="{{ esc_attr__('Mobile primary', 'got-sage') }}"
      x-cloak
      x-show="menuOpen"
      x-trap.inert.noscroll="menuOpen"
      x-ref="mobileMenu"
    >
      <div class="got-mobile-menu__top">
        <span class="got-eyebrow">{{ __('Menu', 'got-sage') }}</span>
        <x-icon-button icon="close" :label="__('Close menu', 'got-sage')" x-on:click="closeMenu()" />
      </div>
      {!! wp_nav_menu(array(
        'theme_location' => 'primary_navigation',
        'container' => false,
        'fallback_cb' => false,
        'menu_class' => 'got-mobile-menu__list',
        'menu_id' => 'got-mobile-menu-list',
        'depth' => 1,
        'echo' => false,
      )) !!}
      <a class="got-mobile-menu__account" href="{{ esc_url($accountUrl) }}">{{ __('Account', 'got-sage') }}</a>
    </nav>
  @endif
</header>
