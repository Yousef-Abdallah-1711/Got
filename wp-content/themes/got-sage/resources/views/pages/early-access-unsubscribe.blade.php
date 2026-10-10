@if ('' !== $earlyAccessToken)
  <section
    class="got-coming-soon__hero got-coming-soon__state"
    aria-labelledby="got-early-access-unsubscribe-title"
    x-data="gotEarlyAccessUnsubscribe($el.dataset.endpoint, $el.dataset.token)"
    data-endpoint="{{ esc_url(rest_url('got/v1/early-access/unsubscribe')) }}"
    data-token="{{ esc_attr($earlyAccessToken) }}"
  >
    <div class="got-coming-soon__hero-inner">
      <p class="got-eyebrow got-coming-soon__eyebrow">{{ __('Drop 01', 'got-sage') }}</p>
      <h1 id="got-early-access-unsubscribe-title" class="got-display">{{ __('Email updates', 'got-sage') }}</h1>
      <p class="got-coming-soon__state-message">{{ __('Confirm that you want to stop receiving Drop 01 email updates.', 'got-sage') }}</p>
      <button class="got-ea__submit" type="button" x-bind:disabled="state === 'loading' || state === 'success'" x-on:click="submit()">
        <span x-show="state !== 'loading'">{{ __('Unsubscribe', 'got-sage') }}</span>
        <span x-cloak x-show="state === 'loading'">{{ __('Updating…', 'got-sage') }}</span>
      </button>
      <p class="got-coming-soon__state-message" role="status" aria-live="polite" x-cloak x-show="message" x-text="message"></p>
    </div>
  </section>
@else
  <section class="got-coming-soon__hero got-coming-soon__state" aria-labelledby="got-early-access-unsubscribe-title">
    <div class="got-coming-soon__hero-inner">
      <p class="got-eyebrow got-coming-soon__eyebrow">{{ __('Drop 01', 'got-sage') }}</p>
      <h1 id="got-early-access-unsubscribe-title" class="got-display">{{ __('This link is not valid', 'got-sage') }}</h1>
      <a class="got-coming-soon__back-link" href="{{ esc_url(home_url('/')) }}">{{ __('Back to GØT', 'got-sage') }}</a>
    </div>
  </section>
@endif
