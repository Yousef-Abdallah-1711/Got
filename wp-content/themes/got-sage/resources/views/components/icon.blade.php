@props(['name'])

<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" {{ $attributes }}>
  @switch($name)
    @case('menu')
      <path d="M4 7h16M4 12h16M4 17h16" />
      @break
    @case('close')
      <path d="m6 6 12 12M18 6 6 18" />
      @break
    @case('search')
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
      @break
    @case('account')
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c.8-3.5 3.4-5.5 7.5-5.5s6.7 2 7.5 5.5" />
      @break
    @case('bag')
      <path d="M5 8h14l1 12H4L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      @break
    @case('heart')
      <path d="M20.4 8.7c0 4.1-8.4 10-8.4 10s-8.4-5.9-8.4-10A4.3 4.3 0 0 1 12 6.6a4.3 4.3 0 0 1 8.4 2.1Z" />
      @break
    @case('sun')
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      @break
    @case('instagram')
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      @break
    @case('moon')
      <path d="M20.5 14.2A8.6 8.6 0 0 1 9.8 3.5 8.7 8.7 0 1 0 20.5 14.2Z" />
      @break
    @default
      @php throw new \InvalidArgumentException('Unknown GØT icon: ' . $name); @endphp
  @endswitch
</svg>
