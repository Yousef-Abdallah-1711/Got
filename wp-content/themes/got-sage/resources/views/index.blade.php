@extends('layouts.app')

@section('content')
  @if (function_exists('is_front_page') && is_front_page() && \App\Support\SiteMode::get_mode() === 'coming_soon')
    @php
      $earlyAccessStatus = isset($_GET['got_early_access_status']) && is_string($_GET['got_early_access_status'])
        ? sanitize_key(wp_unslash($_GET['got_early_access_status']))
        : '';
      $submittedEarlyAccessToken = isset($_GET['got_early_access_token']) && is_string($_GET['got_early_access_token'])
        ? sanitize_text_field(wp_unslash($_GET['got_early_access_token']))
        : '';
      $earlyAccessToken = preg_match('/\A[a-f0-9]{64}\z/i', $submittedEarlyAccessToken)
        ? $submittedEarlyAccessToken
        : '';
    @endphp

    @if ('confirmed' === $earlyAccessStatus)
      @include('pages.early-access-confirmed')
    @elseif ('expired' === $earlyAccessStatus)
      @include('pages.early-access-expired')
    @elseif ('unsubscribe' === $earlyAccessStatus)
      @include('pages.early-access-unsubscribe')
    @else
      @include('pages.coming-soon')
    @endif
  @else
    <section class="got-home-placeholder" aria-labelledby="got-home-placeholder-title">
      <p class="got-eyebrow">{{ __('GØT COMMERCE', 'got-sage') }}</p>
      <h1 id="got-home-placeholder-title" class="got-h1">{{ __('Storefront content is being prepared.', 'got-sage') }}</h1>
    </section>
  @endif
@endsection
