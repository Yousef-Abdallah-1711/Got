@php
  $consentText = __('I agree to receive Drop 01 updates by email.', 'got-sage');
@endphp

<form
  class="got-ea got-ea--coming-soon"
  x-data="gotEarlyAccessForm($el.dataset.endpoint, $el.dataset.nonce)"
  x-on:submit.prevent="submit()"
  data-endpoint="{{ esc_url(rest_url('got/v1/early-access')) }}"
  data-nonce="{{ esc_attr(wp_create_nonce('wp_rest')) }}"
  novalidate
>
  <div class="got-ea__row">
    <label class="got-ea__email-field" for="got-early-access-email">
      <span class="got-sr-only">{{ __('Email', 'got-sage') }}</span>
      <input
        id="got-early-access-email"
        class="got-ea__input"
        type="email"
        name="email"
        inputmode="email"
        autocomplete="email"
        placeholder="{{ esc_attr__('you@example.com', 'got-sage') }}"
        required
        x-model="email"
        x-bind:aria-invalid="errors.email ? 'true' : 'false'"
        aria-describedby="got-early-access-email-error"
      >
    </label>

    <button class="got-ea__submit" type="submit" x-bind:disabled="state === 'loading'">
      <span x-show="state !== 'loading'">{{ __('Get early access', 'got-sage') }}</span>
      <span x-cloak x-show="state === 'loading'" aria-live="polite">{{ __('Sending…', 'got-sage') }}</span>
    </button>
  </div>

  <p id="got-early-access-email-error" class="got-ea__field-error" x-cloak x-show="errors.email" x-text="errors.email"></p>

  <div class="got-ea__consent">
    <input id="got-early-access-consent" type="checkbox" name="consent" value="1" required x-model="consent" x-bind:aria-invalid="errors.consent ? 'true' : 'false'" aria-describedby="got-early-access-consent-error">
    <label for="got-early-access-consent">{{ $consentText }}</label>
  </div>
  <p id="got-early-access-consent-error" class="got-ea__field-error" x-cloak x-show="errors.consent" x-text="errors.consent"></p>

  <details class="got-ea__optional">
    <summary>{{ __('Add details (optional)', 'got-sage') }}</summary>
    <div class="got-ea__optional-fields">
      <label class="got-ea__field" for="got-early-access-name">
        <span>{{ __('First name', 'got-sage') }}</span>
        <input id="got-early-access-name" class="got-ea__input" type="text" name="first_name" autocomplete="given-name" maxlength="100" x-model="firstName">
      </label>
      <label class="got-ea__field" for="got-early-access-whatsapp">
        <span>{{ __('WhatsApp / phone', 'got-sage') }}</span>
        <input id="got-early-access-whatsapp" class="got-ea__input" type="tel" name="whatsapp" autocomplete="tel" maxlength="32" x-model="whatsapp">
      </label>
    </div>
  </details>

  <label class="got-ea__honeypot" aria-hidden="true" tabindex="-1">
    <span>{{ __('Leave this field empty', 'got-sage') }}</span>
    <input type="text" name="company_website" tabindex="-1" autocomplete="off" x-model="honeypot">
  </label>

  <p class="got-ea__message" role="status" aria-live="polite" aria-atomic="true" x-cloak x-show="message" x-text="message"></p>
  <p class="got-ea__message got-ea__message--error" role="alert" x-cloak x-show="errorMessage" x-text="errorMessage"></p>
</form>
