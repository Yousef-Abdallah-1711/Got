@php
  $messages = apply_filters(
    'got_sage_announcement_messages',
    array(
      array('text' => __('Forged to be different.', 'got-sage')),
    )
  );

  $messages = is_array($messages)
    ? array_values(array_filter($messages, static fn ($message) => is_array($message) && isset($message['text']) && is_string($message['text']) && '' !== trim($message['text'])))
    : array();

  $initialMessage = $messages[0] ?? null;
@endphp

@if ($initialMessage)
  <section
    class="got-announcement"
    aria-label="{{ esc_attr__('Store announcements', 'got-sage') }}"
    aria-live="off"
    data-messages="{{ wp_json_encode($messages) }}"
    x-data="gotAnnouncementBar($el.dataset.messages)"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @focusin="keyboardFocused = true"
    @focusout="onFocusOut($event)"
  >
    <p class="got-announcement__message" x-text="activeMessage.text">{{ $initialMessage['text'] }}</p>

    <button
      class="got-announcement__control"
      type="button"
      aria-label="{{ esc_attr__('Pause announcements', 'got-sage') }}"
      aria-pressed="false"
      x-cloak
      x-show="messages.length > 1 && !reducedMotion"
      x-bind:aria-label="manuallyPaused ? '{{ esc_attr__('Play announcements', 'got-sage') }}' : '{{ esc_attr__('Pause announcements', 'got-sage') }}'"
      x-bind:aria-pressed="String(manuallyPaused)"
      x-on:click="toggleManualPause()"
      x-text="manuallyPaused ? '{{ esc_html__('Play', 'got-sage') }}' : '{{ esc_html__('Pause', 'got-sage') }}'"
    >{{ esc_html__('Pause', 'got-sage') }}</button>
  </section>
@endif
