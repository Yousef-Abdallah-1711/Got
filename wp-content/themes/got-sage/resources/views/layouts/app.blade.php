<!doctype html>
<html {!! language_attributes() !!} data-theme="dark">
<head>
  <meta charset="{{ get_bloginfo('charset') }}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script>
    (() => {
      let theme = null;

      try {
        const storedTheme = window.localStorage.getItem('got-theme');
        theme = storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null;
      } catch {
        // Persistent storage can be disabled; the OS preference is still available.
      }

      if (!theme) {
        try {
          theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        } catch {
          theme = 'dark';
        }
      }

      document.documentElement.dataset.theme = theme || 'dark';
    })();
  </script>
  {!! wp_head() !!}
  @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body {!! body_class() !!}>
  {!! wp_body_open() !!}
  <a class="got-skip-link" href="#main-content">{{ __('Skip to content', 'got-sage') }}</a>

  @php
    $isCheckout = function_exists('is_checkout') && is_checkout();
    $siteMode = \App\Support\SiteMode::get_mode();
    $isComingSoonHome = function_exists('is_front_page') && is_front_page() && $siteMode === 'coming_soon';
    $headerMode = $isCheckout ? 'checkout' : ($isComingSoonHome ? 'minimal' : 'store');
  @endphp

  @unless ($isComingSoonHome)
    @include('partials.announcement-bar')
  @endunless
  @include('partials.header', ['mode' => $headerMode])

  <main id="main-content" class="got-main{{ $isComingSoonHome ? ' got-main--coming-soon' : '' }}" tabindex="-1">
    @yield('content')
  </main>

  @include('partials.footer', ['isComingSoonHome' => $isComingSoonHome])

  @if ('store' === $headerMode)
    @include('partials.cart-drawer')
  @endif

  {!! wp_footer() !!}
</body>
</html>
