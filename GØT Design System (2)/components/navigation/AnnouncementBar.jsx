import React from 'react';

const prefersReducedMotion = () => typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function AnnouncementBar({ messages, children, quiet, variant, onSelect }) {
  const list = Array.isArray(messages) && messages.length ? messages : children ? [{ text: children }] : [];
  const items = list.filter(item => item && item.text);
  const many = items.length > 1;
  const [reducedMotion, setReducedMotion] = React.useState(prefersReducedMotion);
  const [paused, setPaused] = React.useState(prefersReducedMotion);
  const [duration, setDuration] = React.useState(30);
  const groupRef = React.useRef(null);

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setReducedMotion(query.matches);
      if (query.matches) setPaused(true);
    };
    if (query.addEventListener) {
      query.addEventListener('change', update);
      return () => query.removeEventListener('change', update);
    }
    query.addListener(update);
    return () => query.removeListener(update);
  }, []);

  React.useEffect(() => {
    const group = groupRef.current;
    if (!many || reducedMotion || !group || typeof ResizeObserver === 'undefined') return;
    const updateDuration = () => {
      const width = group.getBoundingClientRect().width;
      if (width > 0) setDuration(Math.max(18, Math.round(width / 36)));
    };
    updateDuration();
    const observer = new ResizeObserver(updateDuration);
    observer.observe(group);
    return () => observer.disconnect();
  }, [many, reducedMotion, items.length]);

  if (!items.length) return null;
  const variantName = quiet ? 'quiet' : variant || 'lime';
  const animated = many && !reducedMotion;
  const trackClass = 'got-announce__track' + (animated ? ' got-announce__track--animated' : ' got-announce__track--static') + (paused ? ' is-paused' : '');

  const renderMessage = (message, index, clone) => (
    <span key={(clone ? 'copy-' : 'message-') + index} className="got-announce__message">
      {message.key || message.href
        ? <a href={message.href || '#'} tabIndex={clone ? -1 : undefined} onClick={event => { if (onSelect) { event.preventDefault(); onSelect(message); } }}>{message.text}</a>
        : message.text}
    </span>
  );

  return (
    <div className={'got-announce got-announce--' + variantName} role="region" aria-label={'Announcements: ' + items.map(item => item.text).join('. ')}>
      <div className="got-announce__view" aria-live="off">
        <div className={trackClass} style={{ '--got-announce-duration': duration + 's' }}>
          <div className="got-announce__group" dir="ltr" ref={groupRef}>
            {items.map((message, index) => renderMessage(message, index, false))}
          </div>
          {animated && <div className="got-announce__group" dir="ltr" aria-hidden="true">
            {items.map((message, index) => renderMessage(message, index, true))}
          </div>}
        </div>
      </div>
      {many && !reducedMotion && <button type="button" className="got-announce__btn" aria-label={paused ? 'Play announcements' : 'Pause announcements'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Play' : 'Pause'}</button>}
    </div>
  );
}
