@php
  $footerMenus = array(
    array('title' => __('Shop', 'got-sage'), 'location' => 'footer_shop'),
    array('title' => __('Help', 'got-sage'), 'location' => 'footer_help'),
    array('title' => __('Follow', 'got-sage'), 'location' => 'footer_follow'),
  );
@endphp

<footer class="got-footer">
  <div class="got-footer__inner">
    <div class="got-footer__brand">
      <a href="{{ esc_url(home_url('/')) }}" aria-label="{{ esc_attr__('GØT home', 'got-sage') }}">
        <x-wordmark size="large" />
      </a>
      <p class="got-footer__manifesto got-h2">{{ __('Forged to be different.', 'got-sage') }}</p>
    </div>

    <div class="got-footer__columns">
      @foreach ($footerMenus as $index => $menu)
        <section aria-labelledby="got-footer-heading-{{ $index }}">
          <h2 id="got-footer-heading-{{ $index }}" class="got-footer__heading">{{ $menu['title'] }}</h2>
          {!! wp_nav_menu(array(
            'theme_location' => $menu['location'],
            'container' => false,
            'fallback_cb' => false,
            'menu_class' => 'got-footer-menu',
            'depth' => 1,
            'echo' => false,
          )) !!}
        </section>
      @endforeach
    </div>
  </div>

  <div class="got-footer__base">
    <p>{{ sprintf(__('© %1$s GØT · Alexandria, Egypt', 'got-sage'), wp_date('Y')) }}</p>
  </div>
</footer>
