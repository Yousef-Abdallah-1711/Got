@extends('layouts.app')

@section('content')
  <div class="got-woocommerce">
    @if (function_exists('woocommerce_content'))
      @php
        woocommerce_content();
      @endphp
    @endif
  </div>
@endsection
