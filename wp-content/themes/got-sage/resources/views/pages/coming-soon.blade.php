<div class="got-coming-soon">
  <section class="got-coming-soon__hero" aria-labelledby="got-coming-soon-title">
    <div class="got-coming-soon__hero-inner">
      <x-wordmark
        size="hero"
        class="got-coming-soon__mark"
        :alt="__('GØT sword logo', 'got-sage')"
      />

      <p class="got-eyebrow got-coming-soon__eyebrow">{{ __('EST. 2026 / Alexandria, Egypt', 'got-sage') }}</p>
      <h1 id="got-coming-soon-title" class="got-display">{{ __('Forged to be different', 'got-sage') }}</h1>
      <p class="got-eyebrow got-coming-soon__drop">{{ __('Drop 01 — Coming soon', 'got-sage') }}</p>

      @include('components.early-access-form')
    </div>
  </section>

  <section class="got-coming-soon__story" aria-labelledby="got-coming-soon-story-title">
    <figure class="got-coming-soon__story-image">
      <img
        src="{{ \Illuminate\Support\Facades\Vite::asset('resources/images/coming-soon-drop-01.webp') }}"
        alt="{{ esc_attr__('Visual concept: a folded black heavyweight hoodie in a charcoal garment box with tissue paper.', 'got-sage') }}"
        width="1024"
        height="1536"
        loading="lazy"
        decoding="async"
      >
      <figcaption class="got-coming-soon__image-label">{{ __('Drop 01 / Visual concept', 'got-sage') }}</figcaption>
    </figure>

    <div class="got-coming-soon__story-copy">
      <p class="got-eyebrow">{{ __('Drop 01', 'got-sage') }}</p>
      <h2 id="got-coming-soon-story-title" class="got-h1">{{ __('More than just a hoodie', 'got-sage') }}</h2>
      <p class="got-body">{{ __('Get an email when Drop 01 updates are available.', 'got-sage') }}</p>
    </div>
  </section>
</div>
