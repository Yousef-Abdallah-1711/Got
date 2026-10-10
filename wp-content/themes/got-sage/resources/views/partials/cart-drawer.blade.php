@php
  $shopUrl = function_exists('wc_get_page_permalink') ? wc_get_page_permalink('shop') : home_url('/');
@endphp

<div
  class="got-cart-overlay"
  x-data="gotCartDrawer()"
  x-on:got-cart-open.window="show()"
  x-on:keydown.escape.window.prevent="close()"
  x-show="open"
  x-cloak
  x-transition.opacity.duration.200ms
  x-on:click.self="close()"
>
  <aside
    class="got-cart-drawer"
    role="dialog"
    aria-modal="true"
    aria-labelledby="got-cart-title"
    tabindex="-1"
    x-trap.inert.noscroll="open"
    x-on:click.stop
  >
    <div class="got-cart-drawer__header">
      <h2 id="got-cart-title" class="got-cart-drawer__title got-label">{{ __('Cart', 'got-sage') }}</h2>
      <x-icon-button
        icon="close"
        :label="__('Close cart', 'got-sage')"
        x-ref="closeButton"
        x-on:click="close()"
      />
    </div>

    <div class="got-cart-drawer__body">
      <p class="got-h3">{{ __('Your cart is empty', 'got-sage') }}</p>
      <p class="got-small">{{ __('Nothing here yet.', 'got-sage') }}</p>
      <x-button variant="secondary" :href="$shopUrl">{{ __('Shop', 'got-sage') }}</x-button>
    </div>
  </aside>
</div>
