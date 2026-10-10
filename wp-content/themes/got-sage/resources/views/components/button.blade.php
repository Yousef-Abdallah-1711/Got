@props(['variant' => 'primary', 'size' => 'medium', 'href' => null, 'type' => 'button', 'fullWidth' => false])

@php
  $variants = ['primary', 'secondary', 'link'];
  $sizes = ['medium', 'large'];

  if (! in_array($variant, $variants, true) || ! in_array($size, $sizes, true)) {
    throw new \InvalidArgumentException('Unsupported GØT button variant or size.');
  }

  $buttonClasses = [
    'got-button',
    'got-button--' . $variant,
    'got-button--large' => 'large' === $size,
    'got-button--full' => (bool) $fullWidth,
  ];
@endphp

@if ($href)
  <a href="{{ esc_url($href) }}" {{ $attributes->class($buttonClasses) }}>{{ $slot }}</a>
@else
  <button type="{{ esc_attr($type) }}" {{ $attributes->class($buttonClasses) }}>{{ $slot }}</button>
@endif
