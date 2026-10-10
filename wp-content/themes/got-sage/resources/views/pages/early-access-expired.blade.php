<section class="got-coming-soon__hero got-coming-soon__state" aria-labelledby="got-early-access-expired-title">
  <div class="got-coming-soon__hero-inner">
    <p class="got-eyebrow got-coming-soon__eyebrow">{{ __('Drop 01', 'got-sage') }}</p>
    <h1 id="got-early-access-expired-title" class="got-display">{{ __('This link has expired', 'got-sage') }}</h1>
    <p class="got-coming-soon__state-message" role="status">
      {{ __('Request early access again to receive a new confirmation link.', 'got-sage') }}
    </p>
    <a class="got-coming-soon__back-link" href="{{ esc_url(home_url('/')) }}#got-early-access-email">{{ __('Request a new link', 'got-sage') }}</a>
  </div>
</section>
