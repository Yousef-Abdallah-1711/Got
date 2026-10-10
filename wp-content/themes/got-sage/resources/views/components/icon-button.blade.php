@props(['icon', 'label', 'href' => null, 'type' => 'button'])

@php
  if (! is_string($label) || '' === trim($label)) {
    throw new \InvalidArgumentException('GØT icon buttons require an accessible label.');
  }
@endphp

@if ($href)
  <a href="{{ esc_url($href) }}" aria-label="{{ esc_attr($label) }}" {{ $attributes->class(['got-icon-button']) }}>
    <x-icon :name="$icon" />
    <span class="got-sr-only">{{ $label }}</span>
  </a>
@else
  <button type="{{ esc_attr($type) }}" aria-label="{{ esc_attr($label) }}" {{ $attributes->class(['got-icon-button']) }}>
    <x-icon :name="$icon" />
    <span class="got-sr-only">{{ $label }}</span>
  </button>
@endif
