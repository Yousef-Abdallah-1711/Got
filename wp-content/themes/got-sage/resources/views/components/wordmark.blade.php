@props(['size' => 'standard', 'alt' => ''])

<img
  src="{{ \Illuminate\Support\Facades\Vite::asset('resources/images/got-logo.webp') }}"
  alt="{{ esc_attr($alt) }}"
  width="1254"
  height="1254"
  decoding="async"
  {{ $attributes->class([
    'got-wordmark',
    'got-wordmark--large' => 'large' === $size,
    'got-wordmark--hero' => 'hero' === $size,
  ]) }}
>
