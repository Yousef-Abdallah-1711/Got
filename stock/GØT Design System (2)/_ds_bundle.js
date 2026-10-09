/* @ds-bundle: {"format":4,"namespace":"GTDesignSystem_f9e073","components":[{"name":"CartDrawer","sourcePath":"components/commerce/CartDrawer.jsx"},{"name":"CartLine","sourcePath":"components/commerce/CartLine.jsx"},{"name":"OrderSummary","sourcePath":"components/commerce/OrderSummary.jsx"},{"name":"Price","sourcePath":"components/commerce/Price.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"ICON_NAMES","sourcePath":"components/core/Icon.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Wordmark","sourcePath":"components/core/Wordmark.jsx"},{"name":"Modal","sourcePath":"components/feedback/Modal.jsx"},{"name":"Notice","sourcePath":"components/feedback/Notice.jsx"},{"name":"Skeleton","sourcePath":"components/feedback/Skeleton.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"ColorSelector","sourcePath":"components/forms/ColorSelector.jsx"},{"name":"EarlyAccessForm","sourcePath":"components/forms/EarlyAccessForm.jsx"},{"name":"QuantityStepper","sourcePath":"components/forms/QuantityStepper.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"SizeSelector","sourcePath":"components/forms/SizeSelector.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"Accordion","sourcePath":"components/navigation/Accordion.jsx"},{"name":"AnnouncementBar","sourcePath":"components/navigation/AnnouncementBar.jsx"},{"name":"FilterBar","sourcePath":"components/navigation/FilterBar.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"Header","sourcePath":"components/navigation/Header.jsx"},{"name":"ThemeToggle","sourcePath":"components/navigation/ThemeToggle.jsx"}],"sourceHashes":{"components/commerce/CartDrawer.jsx":"dab0dcad21fd","components/commerce/CartLine.jsx":"37f9cee91ba3","components/commerce/OrderSummary.jsx":"f911f5032341","components/commerce/Price.jsx":"44d06fb25214","components/commerce/ProductCard.jsx":"8a5dc1b3ce7c","components/core/Badge.jsx":"e3c9699334b5","components/core/Button.jsx":"0171cd41de44","components/core/Icon.jsx":"c24d57f29744","components/core/IconButton.jsx":"ee965449a761","components/core/Wordmark.jsx":"fa2398944739","components/feedback/Modal.jsx":"3e76a8fffeb7","components/feedback/Notice.jsx":"7f761500a67e","components/feedback/Skeleton.jsx":"ecf903d2a250","components/forms/Checkbox.jsx":"5c333c6f4f9a","components/forms/ColorSelector.jsx":"ba89699eaf5c","components/forms/EarlyAccessForm.jsx":"59333f3193e5","components/forms/QuantityStepper.jsx":"7133c70c288a","components/forms/Select.jsx":"a6c54583ed2b","components/forms/SizeSelector.jsx":"5a1c37535308","components/forms/TextField.jsx":"a4cb7674ebe8","components/navigation/Accordion.jsx":"d6cd8378364b","components/navigation/AnnouncementBar.jsx":"2d011eb9000c","components/navigation/FilterBar.jsx":"02e51afbd4f1","components/navigation/Footer.jsx":"4363d34db00f","components/navigation/Header.jsx":"dd8fba63312b","components/navigation/ThemeToggle.jsx":"c41ee9db2bdb","ui_kits/storefront/Account.jsx":"0e7fbcde4198","ui_kits/storefront/Checkout.jsx":"4d2e0264dfed","ui_kits/storefront/ComingSoon.jsx":"d6f01601f6b4","ui_kits/storefront/Confirmation.jsx":"5abe55567caa","ui_kits/storefront/DirectCheckout.jsx":"ad44be055f47","ui_kits/storefront/Home.jsx":"16136064521d","ui_kits/storefront/HomeSections.jsx":"1a42654a61f3","ui_kits/storefront/Product.jsx":"d67820e903b5","ui_kits/storefront/Shop.jsx":"d30c4c54c5d8","ui_kits/storefront/ThankYou.jsx":"87626a0414f9","ui_kits/storefront/data.js":"4c03d08cbee8","ui_kits/storefront/home-content.js":"f056c8454c81","ui_kits/storefront/image-slot.js":"fff26d081c8d"},"inlinedExternals":[],"unexposedExports":[{"name":"formatEGP","sourcePath":"components/commerce/Price.jsx"}]} */

(() => {

const __ds_ns = (window.GTDesignSystem_f9e073 = window.GTDesignSystem_f9e073 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/commerce/Price.jsx
try { (() => {
const formatEGP = n => 'EGP ' + Number(n).toLocaleString('en-US', {
  minimumFractionDigits: n % 1 ? 2 : 0,
  maximumFractionDigits: 2
});
function Price({
  amount,
  compareAt,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: 'got-price ' + className
  }, compareAt > amount && /*#__PURE__*/React.createElement("s", null, /*#__PURE__*/React.createElement("span", {
    className: "got-sr"
  }, "Was "), formatEGP(compareAt)), compareAt > amount && /*#__PURE__*/React.createElement("span", {
    className: "got-sr"
  }, "Now "), formatEGP(amount));
}
Object.assign(__ds_scope, { formatEGP, Price });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/Price.jsx", error: String((e && e.message) || e) }); }

// components/commerce/OrderSummary.jsx
try { (() => {
function OrderSummary({
  subtotal = 0,
  shipping,
  discount,
  total,
  note
}) {
  return /*#__PURE__*/React.createElement("dl", {
    className: "got-summary",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-summary__row"
  }, /*#__PURE__*/React.createElement("dt", null, "Subtotal"), /*#__PURE__*/React.createElement("dd", null, __ds_scope.formatEGP(subtotal))), discount > 0 && /*#__PURE__*/React.createElement("div", {
    className: "got-summary__row"
  }, /*#__PURE__*/React.createElement("dt", null, "Discount"), /*#__PURE__*/React.createElement("dd", null, "\u2212", __ds_scope.formatEGP(discount))), /*#__PURE__*/React.createElement("div", {
    className: "got-summary__row"
  }, /*#__PURE__*/React.createElement("dt", null, "Shipping"), /*#__PURE__*/React.createElement("dd", null, shipping == null ? 'Calculated at checkout' : shipping === 0 ? 'Free' : __ds_scope.formatEGP(shipping))), /*#__PURE__*/React.createElement("div", {
    className: "got-summary__row got-summary__total"
  }, /*#__PURE__*/React.createElement("dt", null, "Total"), /*#__PURE__*/React.createElement("dd", null, total == null ? 'Calculated at checkout' : __ds_scope.formatEGP(total))), note && /*#__PURE__*/React.createElement("p", {
    className: "got-small",
    style: {
      margin: 0
    }
  }, note));
}
Object.assign(__ds_scope, { OrderSummary });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/OrderSummary.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function Badge({
  tone = 'outline',
  pill,
  children,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: 'got-badge got-badge--' + tone + (pill ? ' got-badge--pill' : '') + ' ' + className
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
// Lucide v0.460.0 (ISC) path data, copied programmatically from lucide-static — see assets/icons/
const PATHS = {
  "shopping-bag": "<path d=\"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z\" /> <path d=\"M3 6h18\" /> <path d=\"M16 10a4 4 0 0 1-8 0\" />",
  "search": "<circle cx=\"11\" cy=\"11\" r=\"8\" /> <path d=\"m21 21-4.3-4.3\" />",
  "user": "<path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\" /> <circle cx=\"12\" cy=\"7\" r=\"4\" />",
  "sun": "<circle cx=\"12\" cy=\"12\" r=\"4\" /> <path d=\"M12 2v2\" /> <path d=\"M12 20v2\" /> <path d=\"m4.93 4.93 1.41 1.41\" /> <path d=\"m17.66 17.66 1.41 1.41\" /> <path d=\"M2 12h2\" /> <path d=\"M20 12h2\" /> <path d=\"m6.34 17.66-1.41 1.41\" /> <path d=\"m19.07 4.93-1.41 1.41\" />",
  "moon": "<path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z\" />",
  "menu": "<line x1=\"4\" x2=\"20\" y1=\"12\" y2=\"12\" /> <line x1=\"4\" x2=\"20\" y1=\"6\" y2=\"6\" /> <line x1=\"4\" x2=\"20\" y1=\"18\" y2=\"18\" />",
  "x": "<path d=\"M18 6 6 18\" /> <path d=\"m6 6 12 12\" />",
  "plus": "<path d=\"M5 12h14\" /> <path d=\"M12 5v14\" />",
  "minus": "<path d=\"M5 12h14\" />",
  "arrow-right": "<path d=\"M5 12h14\" /> <path d=\"m12 5 7 7-7 7\" />",
  "arrow-left": "<path d=\"m12 19-7-7 7-7\" /> <path d=\"M19 12H5\" />",
  "arrow-up-right": "<path d=\"M7 7h10v10\" /> <path d=\"M7 17 17 7\" />",
  "chevron-down": "<path d=\"m6 9 6 6 6-6\" />",
  "chevron-right": "<path d=\"m9 18 6-6-6-6\" />",
  "chevron-left": "<path d=\"m15 18-6-6 6-6\" />",
  "check": "<path d=\"M20 6 9 17l-5-5\" />",
  "heart": "<path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\" />",
  "instagram": "<rect width=\"20\" height=\"20\" x=\"2\" y=\"2\" rx=\"5\" ry=\"5\" /> <path d=\"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z\" /> <line x1=\"17.5\" x2=\"17.51\" y1=\"6.5\" y2=\"6.5\" />",
  "circle-alert": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\" /> <line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\" />",
  "circle-check": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"m9 12 2 2 4-4\" />",
  "truck": "<path d=\"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2\" /> <path d=\"M15 18H9\" /> <path d=\"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14\" /> <circle cx=\"17\" cy=\"18\" r=\"2\" /> <circle cx=\"7\" cy=\"18\" r=\"2\" />",
  "lock": "<rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\" /> <path d=\"M7 11V7a5 5 0 0 1 10 0v4\" />",
  "trash-2": "<path d=\"M3 6h18\" /> <path d=\"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6\" /> <path d=\"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2\" /> <line x1=\"10\" x2=\"10\" y1=\"11\" y2=\"17\" /> <line x1=\"14\" x2=\"14\" y1=\"11\" y2=\"17\" />",
  "loader-circle": "<path d=\"M21 12a9 9 0 1 1-6.219-8.56\" />",
  "mail": "<rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\" /> <path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\" />",
  "sliders-horizontal": "<line x1=\"21\" x2=\"14\" y1=\"4\" y2=\"4\" /> <line x1=\"10\" x2=\"3\" y1=\"4\" y2=\"4\" /> <line x1=\"21\" x2=\"12\" y1=\"12\" y2=\"12\" /> <line x1=\"8\" x2=\"3\" y1=\"12\" y2=\"12\" /> <line x1=\"21\" x2=\"16\" y1=\"20\" y2=\"20\" /> <line x1=\"12\" x2=\"3\" y1=\"20\" y2=\"20\" /> <line x1=\"14\" x2=\"14\" y1=\"2\" y2=\"6\" /> <line x1=\"8\" x2=\"8\" y1=\"10\" y2=\"14\" /> <line x1=\"16\" x2=\"16\" y1=\"18\" y2=\"22\" />",
  "ruler": "<path d=\"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z\" /> <path d=\"m14.5 12.5 2-2\" /> <path d=\"m11.5 9.5 2-2\" /> <path d=\"m8.5 6.5 2-2\" /> <path d=\"m17.5 15.5 2-2\" />",
  "info": "<circle cx=\"12\" cy=\"12\" r=\"10\" /> <path d=\"M12 16v-4\" /> <path d=\"M12 8h.01\" />",
  "package": "<path d=\"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z\" /> <path d=\"M12 22V12\" /> <path d=\"m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7\" /> <path d=\"m7.5 4.27 9 5.15\" />",
  "phone": "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z\" />",
  "map-pin": "<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\" /> <circle cx=\"12\" cy=\"10\" r=\"3\" />",
  "zoom-in": "<circle cx=\"11\" cy=\"11\" r=\"8\" /> <line x1=\"21\" x2=\"16.65\" y1=\"21\" y2=\"16.65\" /> <line x1=\"11\" x2=\"11\" y1=\"8\" y2=\"14\" /> <line x1=\"8\" x2=\"14\" y1=\"11\" y2=\"11\" />"
};
const ICON_NAMES = Object.keys(PATHS);
function Icon({
  name,
  size = 20,
  strokeWidth = 1.5,
  label,
  className = '',
  style
}) {
  const d = PATHS[name];
  if (!d) return null;
  return /*#__PURE__*/React.createElement("svg", {
    className: 'got-icon ' + className,
    style: style,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "square",
    strokeLinejoin: "miter",
    role: label ? 'img' : undefined,
    "aria-label": label,
    "aria-hidden": label ? undefined : true,
    dangerouslySetInnerHTML: {
      __html: d
    }
  });
}
Object.assign(__ds_scope, { ICON_NAMES, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  loading,
  disabled,
  iconLeft,
  iconRight,
  arrow,
  href,
  children,
  className = '',
  ...rest
}) {
  const cls = ['got-btn', 'got-btn--' + variant, size !== 'md' && 'got-btn--' + size, fullWidth && 'got-btn--full', className].filter(Boolean).join(' ');
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, loading ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "loader-circle",
    size: 16,
    className: "got-spin"
  }) : iconLeft && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, children), !loading && iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: 16
  }), !loading && arrow && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 16,
    className: "got-btn__arrow"
  }));
  if (href && !disabled) return /*#__PURE__*/React.createElement("a", _extends({
    className: cls,
    href: href
  }, rest), inner);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    disabled: disabled,
    "aria-busy": loading || undefined
  }, rest, {
    onClick: loading ? undefined : rest.onClick
  }), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  icon,
  label,
  count,
  variant = 'plain',
  size = 20,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: 'got-iconbtn ' + (variant === 'outline' ? 'got-iconbtn--outline ' : '') + className,
    "aria-label": count ? label + ', ' + count + ' items' : label
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size
  }), count > 0 && /*#__PURE__*/React.createElement("span", {
    className: "got-iconbtn__count",
    "aria-hidden": "true"
  }, count));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
function ProductCard({
  name,
  price,
  compareAt,
  image,
  altImage,
  meta,
  badge,
  soldOut,
  onClick,
  href = '#',
  wishlisted,
  onWishlist,
  colors
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: 'got-pcard' + (soldOut ? ' got-pcard--soldout' : '')
  }, /*#__PURE__*/React.createElement("a", {
    href: href,
    className: "got-pcard__link",
    onClick: e => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-pcard__media"
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    loading: "lazy"
  }) : /*#__PURE__*/React.createElement("span", {
    className: "got-ph"
  }, "Product image \xB7 4:5"), image && altImage && /*#__PURE__*/React.createElement("img", {
    className: "got-pcard__alt",
    src: altImage,
    alt: "",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("div", {
    className: "got-pcard__badges"
  }, soldOut ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "soldout"
  }, "Sold out") : badge && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: badge === 'New' ? 'new' : 'outline'
  }, badge))), /*#__PURE__*/React.createElement("div", {
    className: "got-pcard__info"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "got-pcard__name"
  }, name), meta && /*#__PURE__*/React.createElement("p", {
    className: "got-pcard__meta"
  }, meta), colors && colors.length > 1 && /*#__PURE__*/React.createElement("div", {
    className: "got-pcard__sw",
    "aria-label": colors.length + ' colours',
    role: "img"
  }, colors.map(c => /*#__PURE__*/React.createElement("i", {
    key: c.name,
    style: {
      background: c.hex
    },
    title: c.name
  })))), /*#__PURE__*/React.createElement(__ds_scope.Price, {
    amount: price,
    compareAt: compareAt
  }))), onWishlist && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    className: 'got-pcard__wish' + (wishlisted ? ' is-on' : ''),
    icon: "heart",
    size: 18,
    label: (wishlisted ? 'Remove ' : 'Add ') + name + (wishlisted ? ' from wishlist' : ' to wishlist'),
    "aria-pressed": !!wishlisted,
    onClick: onWishlist
  }));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Wordmark.jsx
try { (() => {
// Typeset placeholder. The real GØT sword monogram must come from the owner-approved vector master — never redraw it.
function Wordmark({
  size = 24,
  href,
  className = '',
  style
}) {
  const s = {
    fontSize: size,
    ...style
  };
  const txt = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "G\xD8T"), /*#__PURE__*/React.createElement("span", {
    className: "got-sr"
  }, "GOT"));
  return href ? /*#__PURE__*/React.createElement("a", {
    href: href,
    className: 'got-wordmark ' + className,
    style: s
  }, txt) : /*#__PURE__*/React.createElement("span", {
    className: 'got-wordmark ' + className,
    style: s
  }, txt);
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Modal.jsx
try { (() => {
function Modal({
  open,
  title,
  onClose,
  children,
  footer,
  contained
}) {
  const dialogRef = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const dialog = dialogRef.current;
    const focusable = () => dialog ? Array.from(dialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')) : [];
    const first = focusable()[0];
    if (first) first.focus();
    const keydown = e => {
      if (e.key === 'Escape') { onClose && onClose(); return; }
      if (e.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) { e.preventDefault(); return; }
      if (e.shiftKey && document.activeElement === items[0]) { e.preventDefault(); items[items.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === items[items.length - 1]) { e.preventDefault(); items[0].focus(); }
    };
    document.addEventListener('keydown', keydown);
    return () => { document.removeEventListener('keydown', keydown); if (previous && typeof previous.focus === 'function') previous.focus(); };
  }, [open, onClose]);
  if (!open) return null;
  const pos = contained ? 'absolute' : 'fixed';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: pos,
      inset: 0,
      zIndex: 'var(--z-modal)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-scrim",
    style: {
      position: pos
    },
    onClick: onClose
  }), /*#__PURE__*/React.createElement("div", {
    ref: dialogRef,
    className: "got-modal",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": title
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-modal__head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "got-modal__title"
  }, title), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Close",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    className: "got-modal__body"
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    className: "got-modal__foot"
  }, footer)));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Modal.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Notice.jsx
try { (() => {
const ICON = {
  info: 'info',
  success: 'circle-check',
  error: 'circle-alert',
  warning: 'circle-alert'
};
function Notice({
  tone = 'info',
  title,
  children,
  onDismiss,
  toast,
  action,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: 'got-notice got-notice--' + tone + (toast ? ' got-notice--toast' : '') + ' ' + className,
    role: tone === 'error' ? 'alert' : 'status',
    "aria-live": tone === 'error' ? 'assertive' : 'polite'
  }, /*#__PURE__*/React.createElement("span", {
    className: "got-notice__icon"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ICON[tone],
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    className: "got-notice__body"
  }, title && /*#__PURE__*/React.createElement("p", {
    className: "got-notice__title"
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      color: title ? 'var(--got-text-muted)' : undefined
    }
  }, children), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, action)), onDismiss && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    className: "got-notice__close",
    icon: "x",
    size: 16,
    label: "Dismiss",
    onClick: onDismiss
  }));
}
Object.assign(__ds_scope, { Notice });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Notice.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Skeleton.jsx
try { (() => {
function Skeleton({
  variant = 'block',
  width,
  height,
  lines = 3,
  style
}) {
  if (variant === 'text') return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      width: width || '100%',
      ...style
    },
    "aria-hidden": "true"
  }, Array.from({
    length: lines
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "got-skel",
    style: {
      height: 12,
      width: i === lines - 1 ? '60%' : '100%'
    }
  })));
  if (variant === 'card') return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      width: width || '100%',
      ...style
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "got-skel",
    style: {
      aspectRatio: '4/5'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "got-skel",
    style: {
      height: 12,
      width: '55%'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "got-skel",
    style: {
      height: 12,
      width: '22%'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "got-skel",
    style: {
      height: 12,
      width: '35%'
    }
  }));
  return /*#__PURE__*/React.createElement("span", {
    className: "got-skel",
    style: {
      width: width || '100%',
      height: height || 16,
      ...style
    },
    "aria-hidden": "true"
  });
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  error,
  disabled,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: 'got-check' + (disabled ? ' got-check--disabled' : '') + ' ' + className
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    disabled: disabled,
    "aria-invalid": error ? true : undefined
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "got-check__box"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14,
    strokeWidth: 2
  })), /*#__PURE__*/React.createElement("span", null, label, error && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      color: 'var(--color-error)',
      marginTop: 4
    }
  }, error)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/ColorSelector.jsx
try { (() => {
function ColorSelector({
  colors = [],
  value,
  onChange,
  label = 'Color',
  name
}) {
  const auto = React.useId();
  const n = name || 'color-' + auto;
  return /*#__PURE__*/React.createElement("fieldset", {
    className: "got-opts"
  }, /*#__PURE__*/React.createElement("legend", {
    className: "got-opts__legend"
  }, label, value && /*#__PURE__*/React.createElement("span", {
    className: "got-opts__value"
  }, " \u2014 ", value)), /*#__PURE__*/React.createElement("div", {
    className: "got-swatches"
  }, colors.map(c => /*#__PURE__*/React.createElement("label", {
    key: c.name,
    className: "got-swatch"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: n,
    value: c.name,
    checked: value === c.name,
    disabled: c.available === false,
    onChange: () => onChange && onChange(c.name)
  }), /*#__PURE__*/React.createElement("span", {
    className: "got-swatch__chip",
    style: {
      background: c.hex
    },
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", null, c.name)))));
}
Object.assign(__ds_scope, { ColorSelector });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/ColorSelector.jsx", error: String((e && e.message) || e) }); }

// components/forms/QuantityStepper.jsx
try { (() => {
function QuantityStepper({
  value = 1,
  min = 1,
  max = 10,
  onChange,
  size = 'md',
  label = 'Quantity'
}) {
  const set = v => onChange && onChange(Math.max(min, Math.min(max, v)));
  return /*#__PURE__*/React.createElement("div", {
    className: 'got-qty' + (size === 'sm' ? ' got-qty--sm' : ''),
    role: "group",
    "aria-label": label
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => set(value - 1),
    disabled: value <= min,
    "aria-label": "Decrease quantity"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "minus",
    size: 16
  })), /*#__PURE__*/React.createElement("output", {
    "aria-live": "polite"
  }, value), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => set(value + 1),
    disabled: value >= max,
    "aria-label": "Increase quantity"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: 16
  })));
}
Object.assign(__ds_scope, { QuantityStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/QuantityStepper.jsx", error: String((e && e.message) || e) }); }

// components/commerce/CartLine.jsx
try { (() => {
function CartLine({
  name,
  variant,
  price,
  qty = 1,
  max = 10,
  image,
  warning,
  onQty,
  onRemove
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "got-line"
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-line__media"
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: ""
  }) : /*#__PURE__*/React.createElement("span", {
    className: "got-ph",
    style: {
      fontSize: 9
    }
  }, "4:5")), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-line__top"
  }, /*#__PURE__*/React.createElement("p", {
    className: "got-line__name"
  }, name), /*#__PURE__*/React.createElement(__ds_scope.Price, {
    amount: price * qty
  })), /*#__PURE__*/React.createElement("p", {
    className: "got-line__var"
  }, variant), /*#__PURE__*/React.createElement("div", {
    className: "got-line__ctrl"
  }, /*#__PURE__*/React.createElement(__ds_scope.QuantityStepper, {
    size: "sm",
    value: qty,
    max: max,
    onChange: onQty,
    label: 'Quantity for ' + name
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "link",
    size: "sm",
    onClick: onRemove,
    "aria-label": 'Remove ' + name
  }, "Remove"))), warning && /*#__PURE__*/React.createElement("div", {
    className: "got-line__warn"
  }, /*#__PURE__*/React.createElement(__ds_scope.Notice, {
    tone: "warning"
  }, warning)));
}
Object.assign(__ds_scope, { CartLine });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CartLine.jsx", error: String((e && e.message) || e) }); }

// components/commerce/CartDrawer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CartDrawer({
  open,
  items = [],
  onClose,
  onQty,
  onRemove,
  onCheckout,
  onViewCart,
  onShop,
  contained
}) {
  React.useEffect(() => {
    if (!open) return;
    const k = e => e.key === 'Escape' && onClose && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, onClose]);
  if (!open) return null;
  const pos = contained ? 'absolute' : 'fixed';
  const count = items.reduce((a, i) => a + i.qty, 0);
  const sub = items.reduce((a, i) => a + i.qty * i.price, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: pos,
      inset: 0,
      zIndex: 'var(--z-drawer)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-scrim",
    style: {
      position: 'absolute'
    },
    onClick: onClose
  }), /*#__PURE__*/React.createElement("aside", {
    className: "got-drawer",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Cart"
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-drawer__head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "got-label"
  }, "Cart ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: 'var(--got-text-muted)'
    }
  }, "(", count, ")")), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Close cart",
    onClick: onClose
  })), items.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "got-drawer__body",
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 16,
      textAlign: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "got-h3",
    style: {
      textTransform: 'uppercase'
    }
  }, "Your cart is empty"), /*#__PURE__*/React.createElement("p", {
    className: "got-small",
    style: {
      margin: 0
    }
  }, "Nothing here yet."), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    arrow: true,
    onClick: onShop
  }, "Shop Drop 01")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "got-drawer__body"
  }, items.map(i => /*#__PURE__*/React.createElement(__ds_scope.CartLine, _extends({
    key: i.id
  }, i, {
    onQty: q => onQty && onQty(i.id, q),
    onRemove: () => onRemove && onRemove(i.id)
  })))), /*#__PURE__*/React.createElement("div", {
    className: "got-drawer__foot"
  }, /*#__PURE__*/React.createElement(__ds_scope.OrderSummary, {
    subtotal: sub,
    note: "Delivery and payment details are confirmed at checkout."
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "lg",
    fullWidth: true,
    onClick: onCheckout
  }, "Checkout"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "link",
    size: "sm",
    onClick: onViewCart
  }, "View cart")))));
}
Object.assign(__ds_scope, { CartDrawer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CartDrawer.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  options = [],
  error,
  hint,
  id,
  hideLabel,
  className = '',
  ...rest
}) {
  const auto = React.useId();
  const fid = id || auto;
  const msg = error || hint;
  return /*#__PURE__*/React.createElement("div", {
    className: 'got-field ' + className
  }, label && /*#__PURE__*/React.createElement("label", {
    className: hideLabel ? 'got-sr' : 'got-field__label',
    htmlFor: fid
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "got-field__control"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fid,
    className: "got-input got-select",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": msg ? fid + '-msg' : undefined
  }, rest), options.map(o => typeof o === 'string' ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value,
    disabled: o.disabled
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    className: "got-field__adorn"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 18
  }))), msg && /*#__PURE__*/React.createElement("p", {
    id: fid + '-msg',
    className: 'got-field__msg' + (error ? ' got-field__msg--error' : ''),
    style: {
      margin: 0
    }
  }, msg));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/SizeSelector.jsx
try { (() => {
function SizeSelector({
  sizes = [],
  value,
  onChange,
  error,
  label = 'Size',
  name,
  aside
}) {
  const auto = React.useId();
  const n = name || 'size-' + auto;
  return /*#__PURE__*/React.createElement("fieldset", {
    className: 'got-opts' + (error ? ' got-opts--error' : ''),
    "aria-describedby": error ? n + '-err' : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-opts__head"
  }, /*#__PURE__*/React.createElement("legend", {
    className: "got-opts__legend"
  }, label, value && /*#__PURE__*/React.createElement("span", {
    className: "got-opts__value"
  }, " \u2014 ", value)), aside), /*#__PURE__*/React.createElement("div", {
    className: "got-opts__row"
  }, sizes.map(s => {
    const o = typeof s === 'string' ? {
      label: s,
      available: true
    } : s;
    return /*#__PURE__*/React.createElement("label", {
      key: o.label,
      className: "got-size"
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: n,
      value: o.label,
      checked: value === o.label,
      disabled: o.available === false,
      onChange: () => onChange && onChange(o.label),
      "aria-label": o.available === false ? o.label + ', sold out' : o.label
    }), /*#__PURE__*/React.createElement("span", null, o.label));
  })), error && /*#__PURE__*/React.createElement("p", {
    id: n + '-err',
    className: "got-field__msg got-field__msg--error",
    style: {
      margin: 0
    }
  }, error));
}
Object.assign(__ds_scope, { SizeSelector });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SizeSelector.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TextField({
  label,
  hideLabel,
  hint,
  error,
  success,
  optional,
  multiline,
  id,
  className = '',
  ...rest
}) {
  const auto = React.useId();
  const fid = id || auto;
  const msgId = fid + '-msg';
  const msg = error || success || hint;
  const Tag = multiline ? 'textarea' : 'input';
  return /*#__PURE__*/React.createElement("div", {
    className: 'got-field ' + className
  }, label && /*#__PURE__*/React.createElement("label", {
    className: hideLabel ? 'got-sr' : 'got-field__label',
    htmlFor: fid
  }, label, optional && /*#__PURE__*/React.createElement("span", {
    className: "got-field__opt"
  }, " (optional)")), /*#__PURE__*/React.createElement("div", {
    className: "got-field__control"
  }, /*#__PURE__*/React.createElement(Tag, _extends({
    id: fid,
    className: 'got-input' + (success ? ' got-input--success got-input--icon' : '') + (error ? ' got-input--icon' : ''),
    "aria-invalid": error ? true : undefined,
    "aria-describedby": msg ? msgId : undefined
  }, rest)), error && /*#__PURE__*/React.createElement("span", {
    className: "got-field__adorn",
    style: {
      color: 'var(--color-error)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "circle-alert",
    size: 18
  })), success && !error && /*#__PURE__*/React.createElement("span", {
    className: "got-field__adorn",
    style: {
      color: 'var(--color-success)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 18
  }))), msg && /*#__PURE__*/React.createElement("p", {
    id: msgId,
    className: 'got-field__msg' + (error ? ' got-field__msg--error' : success ? ' got-field__msg--success' : ''),
    style: {
      margin: 0
    }
  }, msg));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/forms/EarlyAccessForm.jsx
try { (() => {
function EarlyAccessForm({
  state: forced,
  onSubmit,
  cta = 'Get early access'
}) {
  const [email, setEmail] = React.useState('');
  const [consent, setConsent] = React.useState(false);
  const [st, setSt] = React.useState('idle');
  const [err, setErr] = React.useState({});
  const state = forced || st;
  const submit = async e => {
    e.preventDefault();
    const er = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) er.email = 'Enter a valid email address, e.g. name@example.com.';
    if (!consent) er.consent = 'Tick the box so we can email you.';
    setErr(er);
    if (Object.keys(er).length) return;
    setSt('loading');
    try {
      if (!onSubmit) {
        setSt('preview');
        return;
      }
      await onSubmit(email);
      setSt('success');
    } catch (error) {
      setSt('error');
    }
  };
  if (state === 'success') return /*#__PURE__*/React.createElement("div", {
    className: "got-ea__done",
    role: "status"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "mail",
    size: 24
  }), /*#__PURE__*/React.createElement("p", {
    className: "got-label",
    style: {
      margin: 0
    }
  }, "Check your email"), /*#__PURE__*/React.createElement("p", {
    className: "got-small",
    style: {
      margin: 0
    }
  }, "We sent a confirmation link", email ? ' to ' + email : '', ". Confirm it to join the Drop 01 list."));
  if (state === 'preview') return /*#__PURE__*/React.createElement("div", {
    className: "got-ea__done",
    role: "status"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "info",
    size: 24
  }), /*#__PURE__*/React.createElement("p", {
    className: "got-label",
    style: {
      margin: 0
    }
  }, "Signup preview"), /*#__PURE__*/React.createElement("p", {
    className: "got-small",
    style: {
      margin: 0
    }
  }, "No email was saved or sent. Connect the mailing list service to enable Drop 01 updates."));
  return /*#__PURE__*/React.createElement("form", {
    className: "got-ea",
    onSubmit: submit,
    noValidate: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-ea__row"
  }, /*#__PURE__*/React.createElement(__ds_scope.TextField, {
    label: "Email",
    hideLabel: true,
    type: "email",
    autoComplete: "email",
    placeholder: "you@example.com",
    value: email,
    onChange: e => setEmail(e.target.value),
    error: state === 'error' ? 'Something went wrong. Try again in a moment.' : err.email
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    type: "submit",
    loading: state === 'loading',
    size: "lg",
    fullWidth: true
  }, cta))), /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
    label: "I agree to receive Drop 01 updates by email.",
    checked: consent,
    onChange: e => setConsent(e.target.checked),
    error: err.consent
  }));
}
Object.assign(__ds_scope, { EarlyAccessForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/EarlyAccessForm.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Accordion.jsx
try { (() => {
function Accordion({
  items = [],
  defaultOpen = -1,
  multiple
}) {
  const [open, setOpen] = React.useState(defaultOpen >= 0 ? [defaultOpen] : []);
  const auto = React.useId();
  const toggle = i => setOpen(o => o.includes(i) ? o.filter(x => x !== i) : multiple ? [...o, i] : [i]);
  return /*#__PURE__*/React.createElement("div", {
    className: "got-acc"
  }, items.map((it, i) => {
    const on = open.includes(i);
    return /*#__PURE__*/React.createElement("div", {
      className: "got-acc__item",
      key: it.title
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "got-acc__btn",
      "aria-expanded": on,
      "aria-controls": auto + i,
      onClick: () => toggle(i)
    }, it.title, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "plus",
      size: 18
    }))), /*#__PURE__*/React.createElement("div", {
      id: auto + i,
      className: "got-acc__panel",
      hidden: !on
    }, it.content));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/navigation/AnnouncementBar.jsx
try { (() => {
const prefersReducedMotion = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function AnnouncementBar({ messages, children, quiet, variant, onSelect }) {
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
  const renderMessage = (message, index, clone) => /*#__PURE__*/React.createElement("span", {
    key: (clone ? 'copy-' : 'message-') + index,
    className: "got-announce__message"
  }, message.key || message.href ? /*#__PURE__*/React.createElement("a", {
    href: message.href || '#',
    tabIndex: clone ? -1 : undefined,
    onClick: event => {
      if (onSelect) {
        event.preventDefault();
        onSelect(message);
      }
    }
  }, message.text) : message.text);
  return /*#__PURE__*/React.createElement("div", {
    className: 'got-announce got-announce--' + variantName,
    role: "region",
    "aria-label": 'Announcements: ' + items.map(item => item.text).join('. ')
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-announce__view",
    "aria-live": "off"
  }, /*#__PURE__*/React.createElement("div", {
    className: trackClass,
    style: {
      '--got-announce-duration': duration + 's'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-announce__group",
    dir: "ltr",
    ref: groupRef
  }, items.map((message, index) => renderMessage(message, index, false))), animated && /*#__PURE__*/React.createElement("div", {
    className: "got-announce__group",
    dir: "ltr",
    "aria-hidden": "true"
  }, items.map((message, index) => renderMessage(message, index, true))))), many && !reducedMotion && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "got-announce__btn",
    "aria-label": paused ? 'Play announcements' : 'Pause announcements',
    "aria-pressed": paused,
    onClick: () => setPaused(value => !value)
  }, paused ? 'Play' : 'Pause'));
}
Object.assign(__ds_scope, { AnnouncementBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/AnnouncementBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/FilterBar.jsx
try { (() => {
function FilterBar({
  tabs = [],
  active,
  onTab,
  count,
  sort = 'Newest',
  sortOptions = ['Newest', 'Price: low to high', 'Price: high to low'],
  onSort,
  filterCount = 0,
  onFilters
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "got-fbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-tabs",
    role: "tablist",
    "aria-label": "Categories"
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    role: "tab",
    className: "got-tab",
    "aria-selected": t === active,
    onClick: () => onTab && onTab(t)
  }, t))), /*#__PURE__*/React.createElement("div", {
    className: "got-fbar__right"
  }, count != null && /*#__PURE__*/React.createElement("span", {
    className: "got-fbar__count"
  }, count, " ", count === 1 ? 'product' : 'products'), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    size: "sm",
    iconLeft: "sliders-horizontal",
    onClick: onFilters
  }, 'Filter' + (filterCount ? ' (' + filterCount + ')' : '')), /*#__PURE__*/React.createElement(__ds_scope.Select, {
    label: "Sort by",
    hideLabel: true,
    options: sortOptions,
    value: sort,
    onChange: e => onSort && onSort(e.target.value),
    style: {
      minHeight: 44,
      fontSize: 14,
      width: 'auto'
    }
  })));
}
Object.assign(__ds_scope, { FilterBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/FilterBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
const COLS = [{
  h: 'Shop',
  items: ['Drop 01', 'All products', 'Size guide']
}, {
  h: 'Help',
  items: ['Shipping', 'Returns & exchange', 'FAQ', 'Contact']
}, {
  h: 'Follow',
  items: [{
    label: 'Instagram — @got.official1',
    href: 'https://www.instagram.com/got.official1/'
  }, {
    label: 'TikTok — @got.offical',
    href: 'https://www.tiktok.com/@got.offical'
  }, {
    label: 'gotoffical1@gmail.com',
    href: 'mailto:gotoffical1@gmail.com'
  }]
}];
function Footer({
  columns = COLS,
  manifesto = 'Forged to be different.',
  onCookieSettings,
  onLink
}) {
  return /*#__PURE__*/React.createElement("footer", {
    className: "got-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-footer__in"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    size: 40
  }), /*#__PURE__*/React.createElement("p", {
    className: "got-h2",
    style: {
      textTransform: 'uppercase',
      maxWidth: '12ch'
    }
  }, manifesto)), columns.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.h
  }, /*#__PURE__*/React.createElement("h2", {
    className: "got-footer__h"
  }, c.h), /*#__PURE__*/React.createElement("ul", {
    className: "got-footer__list"
  }, c.items.map(i => {
    const o = typeof i === 'string' ? {
      label: i
    } : i;
    return /*#__PURE__*/React.createElement("li", {
      key: o.label
    }, /*#__PURE__*/React.createElement("a", {
      href: o.href || '#',
      onClick: e => {
        if (!o.href && onLink) {
          e.preventDefault();
          onLink(o.label);
        }
      }
    }, o.label));
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "got-footer__base"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 G\xD8T \xB7 Alexandria, Egypt"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Terms"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onCookieSettings && onCookieSettings();
    }
  }, "Cookie settings"))));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/ThemeToggle.jsx
try { (() => {
function ThemeToggle({
  theme = 'dark',
  onToggle,
  showLabel
}) {
  const next = theme === 'dark' ? 'light' : 'dark';
  const btn = /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    key: theme,
    className: "got-theme-anim",
    icon: theme === 'dark' ? 'sun' : 'moon',
    label: 'Switch to ' + next + ' mode',
    "aria-pressed": theme === 'light',
    onClick: () => onToggle && onToggle(next)
  });
  if (!showLabel) return btn;
  return /*#__PURE__*/React.createElement("span", {
    className: "got-toggle"
  }, btn, /*#__PURE__*/React.createElement("span", {
    className: "got-toggle__label",
    "aria-hidden": "true"
  }, theme));
}
Object.assign(__ds_scope, { ThemeToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/ThemeToggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Header.jsx
try { (() => {
function Header({
  nav = [],
  cartCount = 0,
  theme = 'dark',
  onToggleTheme,
  onCart,
  onSearch,
  onAccount,
  onMenu,
  onLogo,
  onNav,
  mode = 'store',
  layout = 'auto',
  sticky,
  compact,
  right,
  wishCount = 0,
  onWishlist
}) {
  const desk = layout !== 'mobile',
    mob = layout !== 'desktop';
  const dc = layout === 'auto' ? ' got-header__desk' : '',
    mc = layout === 'auto' ? ' got-header__mob' : '';
  const logo = /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onLogo && onLogo();
    },
    style: {
      textDecoration: 'none'
    },
    "aria-label": "G\xD8T home"
  }, /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    size: mode === 'checkout' ? 22 : 26
  }));
  if (mode === 'minimal' || mode === 'checkout') return /*#__PURE__*/React.createElement("header", {
    className: 'got-header' + (sticky ? ' got-header--sticky' : '') + (compact ? ' got-header--compact' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-header__in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-header__nav"
  }, mode === 'checkout' ? /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow",
    style: {
      display: 'inline-flex',
      gap: 6,
      alignItems: 'center',
      paddingLeft: 12
    }
  }, "Secure checkout") : right), logo, /*#__PURE__*/React.createElement("div", {
    className: "got-header__utils"
  }, /*#__PURE__*/React.createElement(__ds_scope.ThemeToggle, {
    theme: theme,
    onToggle: onToggleTheme
  }))));
  return /*#__PURE__*/React.createElement("header", {
    className: 'got-header' + (sticky ? ' got-header--sticky' : '') + (compact ? ' got-header--compact' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-header__in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-header__nav"
  }, mob && /*#__PURE__*/React.createElement("span", {
    className: mc,
    style: {
      display: layout === 'auto' ? undefined : 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "menu",
    label: "Open menu",
    onClick: onMenu
  })), desk && /*#__PURE__*/React.createElement("nav", {
    className: dc,
    "aria-label": "Primary",
    style: {
      display: layout === 'auto' ? undefined : 'flex',
      gap: 4
    }
  }, nav.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.label,
    href: n.href || '#',
    className: "got-header__link",
    "aria-current": n.current ? 'page' : undefined,
    onClick: e => {
      if (onNav) {
        e.preventDefault();
        onNav(n);
      }
    }
  }, n.label)))), logo, /*#__PURE__*/React.createElement("div", {
    className: "got-header__utils"
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "search",
    label: "Search",
    onClick: onSearch
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    className: 'got-iconbtn--wish' + (wishCount ? ' got-wish-on' : ''),
    icon: "heart",
    label: "Wishlist",
    count: wishCount,
    "aria-label": wishCount ? 'Wishlist, ' + wishCount + ' saved ' + (wishCount === 1 ? 'product' : 'products') : 'Wishlist',
    onClick: onWishlist
  }), desk && /*#__PURE__*/React.createElement("span", {
    className: dc,
    style: {
      display: layout === 'auto' ? undefined : 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "user",
    label: "Account",
    onClick: onAccount
  })), /*#__PURE__*/React.createElement(__ds_scope.ThemeToggle, {
    theme: theme,
    onToggle: onToggleTheme
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "shopping-bag",
    label: "Cart",
    count: cartCount,
    onClick: onCart
  }))));
}
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Account.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Account({
  go,
  openProduct,
  wishlist = [],
  wish = () => ({})
}) {
  const {
    ProductCard
  } = window.GTDesignSystem_f9e073;
  const {
    TextField,
    Button,
    Checkbox,
    Notice,
    Badge,
    Price,
    Select,
    Icon
  } = window.GTDesignSystem_f9e073;
  const [authed, setAuthed] = React.useState(false);
  const [mode, setMode] = React.useState('signin');
  const [tab, setTab] = React.useState('orders');
  const [err, setErr] = React.useState(null);
  const [busy, setBusy] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [saved, setSaved] = React.useState(false);
  const submit = e => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || pw.length < 8) {
      setErr(mode === 'signin' ? 'Email or password is incorrect. Check both and try again.' : 'Use a valid email and a password of at least 8 characters.');
      return;
    }
    setErr(null);
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setAuthed(true);
    }, 700);
  };
  if (!authed) return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '96px var(--gutter)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
      gap: 96,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      position: 'sticky',
      top: 120
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "Account"), /*#__PURE__*/React.createElement("h1", {
    className: "got-h1"
  }, mode === 'signin' ? 'Sign in' : mode === 'register' ? 'Create account' : 'Reset password'), /*#__PURE__*/React.createElement("p", {
    className: "got-body",
    style: {
      color: 'var(--got-text-muted)',
      margin: 0
    }
  }, "Track orders, save addresses and check out faster. You can also check out as a guest.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, mode !== 'reset' && /*#__PURE__*/React.createElement("div", {
    className: "got-tabs",
    role: "tablist",
    style: {
      margin: 0,
      borderBottom: '1px solid var(--got-border)'
    }
  }, [['signin', 'Sign in'], ['register', 'Register']].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    role: "tab",
    className: "got-tab",
    "aria-selected": mode === k,
    onClick: () => {
      setMode(k);
      setErr(null);
    }
  }, l))), err && /*#__PURE__*/React.createElement(Notice, {
    tone: "error"
  }, err), mode === 'reset' ? /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSaved(true);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, saved ? /*#__PURE__*/React.createElement(Notice, {
    tone: "success",
    title: "Check your email"
  }, "If an account exists for that address, we've sent a reset link.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TextField, {
    label: "Email",
    type: "email",
    autoComplete: "email"
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    size: "lg",
    fullWidth: true
  }, "Send reset link")), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    onClick: () => {
      setMode('signin');
      setSaved(false);
    }
  }, "Back to sign in")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    noValidate: true,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, mode === 'register' && /*#__PURE__*/React.createElement(TextField, {
    label: "First name",
    autoComplete: "given-name"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Email",
    type: "email",
    autoComplete: "email",
    value: email,
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Password",
    type: "password",
    autoComplete: mode === 'signin' ? 'current-password' : 'new-password',
    value: pw,
    onChange: e => setPw(e.target.value),
    hint: mode === 'register' ? 'At least 8 characters.' : undefined
  }), mode === 'signin' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "Keep me signed in"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    size: "sm",
    onClick: () => setMode('reset')
  }, "Forgot password?")) : /*#__PURE__*/React.createElement(Checkbox, {
    label: "Email me about new drops. Unsubscribe anytime."
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    size: "lg",
    fullWidth: true,
    loading: busy
  }, mode === 'signin' ? 'Sign in' : 'Create account'))));
  const P = window.GOT_PRODUCTS;
  const orders = [{
    no: '1001',
    date: '08 Oct 2026',
    status: 'Processing',
    items: [P[0]],
    total: 1510
  }, {
    no: '0994',
    date: '21 Sep 2026',
    status: 'Delivered',
    items: [P[2], P[1]],
    total: 1760
  }];
  const nav = [['orders', 'Orders', 'package'], ['addresses', 'Addresses', 'map-pin'], ['details', 'Account details', 'user'], ['wishlist', 'Wishlist', 'heart']];
  const H = ({
    children
  }) => /*#__PURE__*/React.createElement("h2", {
    className: "got-h2",
    style: {
      textTransform: 'uppercase',
      marginBottom: 32
    }
  }, children);
  let panel;
  if (tab === 'orders') panel = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(H, null, "Orders"), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--got-border)'
    }
  }, orders.map(o => /*#__PURE__*/React.createElement("div", {
    key: o.no,
    style: {
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0,1fr) auto auto',
      gap: 24,
      alignItems: 'center',
      padding: '24px 0',
      borderBottom: '1px solid var(--got-border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, o.items.map((it, i) => /*#__PURE__*/React.createElement("img", {
    key: i,
    src: it.image,
    alt: "",
    style: {
      width: 56,
      aspectRatio: '4/5',
      objectFit: 'cover',
      background: 'var(--got-surface-2)'
    }
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "got-label",
    style: {
      margin: 0
    }
  }, "Order #", o.no, " ", /*#__PURE__*/React.createElement("span", {
    className: "got-sr"
  }, "(sample)")), /*#__PURE__*/React.createElement("p", {
    className: "got-small",
    style: {
      margin: '4px 0 0'
    }
  }, o.date, " \xB7 ", o.items.length, " ", o.items.length === 1 ? 'item' : 'items', " \xB7 Cash on delivery")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: o.status === 'Delivered' ? 'outline' : 'drop'
  }, o.status), /*#__PURE__*/React.createElement(Price, {
    amount: o.total
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => go('confirm')
  }, "View")))));else if (tab === 'addresses') panel = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(H, null, "Addresses"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, ['Shipping', 'Billing'].map(t => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      border: '1px solid var(--got-border)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, t, " address"), /*#__PURE__*/React.createElement("p", {
    className: "got-body",
    style: {
      margin: 0
    }
  }, "Karim A.", /*#__PURE__*/React.createElement("br", null), "Smouha", /*#__PURE__*/React.createElement("br", null), "Alexandria, 21523", /*#__PURE__*/React.createElement("br", null), "Egypt"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    size: "sm"
  }, "Edit"))))));else if (tab === 'details') panel = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(H, null, "Account details"), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    },
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20,
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "First name",
    defaultValue: "Karim",
    autoComplete: "given-name"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Last name",
    autoComplete: "family-name"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1'
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "Email",
    type: "email",
    defaultValue: "karim@example.com"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1'
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "Mobile number",
    type: "tel",
    inputMode: "tel",
    defaultValue: "010 1234 5678"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, saved && /*#__PURE__*/React.createElement(Notice, {
    tone: "success"
  }, "Your details have been saved."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    type: "submit"
  }, "Save changes")))));else panel = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(H, null, "Wishlist"), wishlist.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))',
      gap: '32px 12px'
    }
  }, wishlist.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.id
  }, p, wish(p), {
    onClick: () => openProduct(p)
  })))) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '64px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16,
      textAlign: 'center',
      borderBlock: '1px solid var(--got-border)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    size: 28
  }), /*#__PURE__*/React.createElement("p", {
    className: "got-h3",
    style: {
      textTransform: 'uppercase'
    }
  }, "Nothing saved yet"), /*#__PURE__*/React.createElement("p", {
    className: "got-small",
    style: {
      margin: 0
    }
  }, "Save products to find them here later."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    arrow: true,
    onClick: () => go('shop')
  }, "Shop Drop 01")));
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '64px var(--gutter) 96px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "My account"), /*#__PURE__*/React.createElement("h1", {
    className: "got-h1",
    style: {
      margin: '12px 0 48px'
    }
  }, "Hello, Karim"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '240px minmax(0,1fr)',
      gap: 64,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Account",
    style: {
      display: 'flex',
      flexDirection: 'column',
      borderTop: '1px solid var(--got-border)'
    }
  }, nav.map(([k, l, ic]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    onClick: () => {
      setTab(k);
      setSaved(false);
    },
    "aria-current": tab === k ? 'page' : undefined,
    className: "got-label",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      minHeight: 52,
      padding: '0 12px',
      background: tab === k ? 'var(--got-surface-2)' : 'none',
      border: 0,
      borderBottom: '1px solid var(--got-border)',
      color: tab === k ? 'var(--got-text)' : 'var(--got-text-muted)',
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 18
  }), l)), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setAuthed(false);
      setMode('signin');
      setPw('');
    },
    className: "got-label",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      minHeight: 52,
      padding: '0 12px',
      background: 'none',
      border: 0,
      color: 'var(--got-text-muted)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 18
  }), "Sign out")), /*#__PURE__*/React.createElement("div", null, panel)));
}
window.Account = Account;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Account.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Checkout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkout({
  cart,
  placeOrder
}) {
  const {
    TextField,
    Select,
    Button,
    OrderSummary,
    CartLine,
    Notice
  } = window.GTDesignSystem_f9e073;
  const [busy, setBusy] = React.useState(false);
  const [phone, setPhone] = React.useState('');
  const [err, setErr] = React.useState(null);
  const sub = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const ship = 60;
  const submit = e => {
    e.preventDefault();
    if (!/^01[0125]\d{8}$/.test(phone.replace(/\s/g, ''))) {
      setErr('Enter an Egyptian mobile number, e.g. 010 1234 5678.');
      return;
    }
    setErr(null);
    setBusy(true);
    setTimeout(() => placeOrder({
      total: sub + ship
    }), 1100);
  };
  const H = ({
    n,
    t
  }) => /*#__PURE__*/React.createElement("h2", {
    className: "got-label",
    style: {
      margin: '0 0 16px',
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: 'var(--got-text-muted)'
    }
  }, n), t);
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '48px var(--gutter) 96px',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.3fr) minmax(0,1fr)',
      gap: 64,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    noValidate: true,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "got-h2",
    style: {
      textTransform: 'uppercase'
    }
  }, "Checkout"), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(H, {
    n: "01",
    t: "Contact"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "Email",
    type: "email",
    autoComplete: "email",
    defaultValue: "karim@example.com",
    hint: "Order confirmation is sent here."
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Mobile number",
    type: "tel",
    inputMode: "tel",
    autoComplete: "tel",
    placeholder: "010 1234 5678",
    value: phone,
    onChange: e => setPhone(e.target.value),
    error: err
  }))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(H, {
    n: "02",
    t: "Shipping"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "First name",
    autoComplete: "given-name",
    defaultValue: "Karim"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Last name",
    autoComplete: "family-name"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1'
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "Street address",
    autoComplete: "street-address"
  })), /*#__PURE__*/React.createElement(TextField, {
    label: "City / area",
    defaultValue: "Smouha"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Governorate",
    options: ['Alexandria', 'Cairo', 'Giza', 'Other governorates']
  }))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(H, {
    n: "03",
    t: "Payment"
  }), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      padding: 16,
      border: '1px solid var(--got-text)',
      borderRadius: 2
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    defaultChecked: true,
    name: "pay",
    style: {
      accentColor: 'var(--got-text)',
      width: 18,
      height: 18,
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "got-label"
  }, "Cash on delivery"), /*#__PURE__*/React.createElement("span", {
    className: "got-small",
    style: {
      display: 'block',
      marginTop: 4
    }
  }, "Pay in cash when your order arrives. Keep the exact amount ready.")))), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    size: "lg",
    fullWidth: true,
    loading: busy
  }, busy ? 'Placing order' : 'Place order — EGP ' + (sub + ship).toLocaleString())), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'sticky',
      top: 24,
      background: 'var(--got-surface)',
      border: '1px solid var(--got-border)',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "got-label",
    style: {
      margin: 0
    }
  }, "Order summary"), cart.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Notice, {
    tone: "info"
  }, "Your cart is empty \u2014 add a product to check out.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, cart.map(i => /*#__PURE__*/React.createElement(CartLine, _extends({
    key: i.id
  }, i)))), /*#__PURE__*/React.createElement(OrderSummary, {
    subtotal: sub,
    shipping: ship,
    note: "Alexandria shipping (sample fee). Pay cash on delivery."
  })));
}
window.Checkout = Checkout;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Checkout.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/ComingSoon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ComingSoon({
  theme,
  setTheme,
  go
}) {
  const {
    Header,
    EarlyAccessForm,
    Footer,
    Icon
  } = window.GTDesignSystem_f9e073;
  const social = /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "got-header__link",
    href: "https://www.instagram.com/got.official1/",
    "aria-label": "Instagram"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 18
  })), /*#__PURE__*/React.createElement("a", {
    className: "got-header__link",
    href: "https://www.tiktok.com/@got.offical",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11
    }
  }, "TikTok"));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, {
    mode: "minimal",
    theme: theme,
    onToggleTheme: setTheme,
    right: social,
    onLogo: () => go('home')
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      minHeight: 'calc(100vh - 80px)',
      display: 'grid',
      placeItems: 'center',
      padding: '64px var(--gutter)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 32,
      maxWidth: 1100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 120,
      height: 160,
      position: 'relative',
      border: '1px dashed var(--got-border-strong)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "got-ph",
    style: {
      background: 'transparent',
      fontSize: 9,
      padding: 8
    }
  }, "Sword mark \u2014 vector master")), /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "EST. 2026 / Alexandria, Egypt"), /*#__PURE__*/React.createElement("h1", {
    className: "got-display"
  }, "Forged to be different"), /*#__PURE__*/React.createElement("p", {
    className: "got-eyebrow",
    style: {
      color: 'var(--got-text)',
      fontSize: 14,
      margin: 0
    }
  }, "Drop 01 \u2014 Coming soon"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement(EarlyAccessForm, null)))), /*#__PURE__*/React.createElement("section", {
    style: {
      borderTop: '1px solid var(--got-border)',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
      minHeight: 520
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'var(--got-surface-2)'
    }
  }, /*#__PURE__*/React.createElement("image-slot", _extends({
    id: "coming-pack",
    shape: "rect",
    placeholder: "Packaging detail"
  }, window.GOT_SLOT('pack', 1000, 1100), {
    style: {
      position: 'absolute',
      inset: 0
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '96px var(--gutter)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "Drop 01"), /*#__PURE__*/React.createElement("h2", {
    className: "got-h1"
  }, "More than just a hoodie"), /*#__PURE__*/React.createElement("p", {
    className: "got-body",
    style: {
      color: 'var(--got-text-muted)',
      margin: 0
    }
  }, "Get an email when Drop 01 updates are available."))), /*#__PURE__*/React.createElement(Footer, null));
}
window.ComingSoon = ComingSoon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/ComingSoon.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Confirmation.jsx
try { (() => {
function Confirmation({
  order,
  go
}) {
  const {
    Button,
    Icon,
    OrderSummary
  } = window.GTDesignSystem_f9e073;
  const steps = [['Order received', 'Today', true], ['Confirmed by phone', 'Pending', false], ['Shipped', '—', false], ['Delivered', '—', false]];
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 760,
      margin: '0 auto',
      padding: '96px var(--gutter)',
      display: 'flex',
      flexDirection: 'column',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "Order #1001 (sample)"), /*#__PURE__*/React.createElement("h1", {
    className: "got-h1"
  }, "Order received"), /*#__PURE__*/React.createElement("p", {
    className: "got-body",
    style: {
      color: 'var(--got-text-muted)',
      margin: 0
    }
  }, "We've emailed your confirmation. We'll call to confirm your cash-on-delivery order before shipping.")), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      borderTop: '1px solid var(--got-border)'
    }
  }, steps.map(([t, d, done], i) => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'grid',
      gridTemplateColumns: '32px 1fr auto',
      alignItems: 'center',
      gap: 12,
      padding: '16px 0',
      borderBottom: '1px solid var(--got-border)',
      color: done ? 'var(--got-text)' : 'var(--got-text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      display: 'grid',
      placeItems: 'center',
      border: '1px solid ' + (done ? 'var(--got-text)' : 'var(--got-border)'),
      background: done ? 'var(--got-cta-bg)' : 'transparent',
      color: done ? 'var(--got-cta-text)' : 'inherit'
    }
  }, done ? /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14,
    strokeWidth: 2
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11
    }
  }, i + 1)), /*#__PURE__*/React.createElement("span", {
    className: "got-label"
  }, t, i === 0 && /*#__PURE__*/React.createElement("span", {
    className: "got-sr"
  }, " (current step)")), /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, d)))), /*#__PURE__*/React.createElement(OrderSummary, {
    subtotal: order ? order.total - 60 : 0,
    shipping: 60,
    note: "Payment: cash on delivery."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => go('shop'),
    arrow: true
  }, "Continue shopping"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => go('home')
  }, "Home")));
}
window.Confirmation = Confirmation;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Confirmation.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/DirectCheckout.jsx
try { (() => {
// Embedded direct checkout — UI reference. In production this posts to a Sage/Acorn endpoint that builds an ISOLATED WooCommerce order
// (WC()->cart is never touched; totals, shipping, stock, COD availability validated server-side; idempotency key + row lock on stock).
const GOV = [{
  v: '',
  l: 'Select governorate'
}, {
  v: 'Alexandria',
  l: 'Alexandria',
  fee: 60
}, {
  v: 'Cairo / Giza',
  l: 'Cairo / Giza',
  fee: 75
}, {
  v: 'Other',
  l: 'Other governorates',
  fee: 90
}]; // SAMPLE fees — real fees come from WooCommerce shipping zones

function DirectCheckout({
  product: p,
  color,
  size,
  qty,
  image,
  unitPrice,
  formRef
}) {
  const {
    TextField,
    Select,
    Checkbox,
    Button,
    Notice,
    Icon,
    Price
  } = window.GTDesignSystem_f9e073;
  const [f, setF] = React.useState({
    name: '',
    phone: '',
    email: '',
    gov: '',
    city: '',
    street: '',
    bldg: '',
    floor: '',
    notes: ''
  });
  const [terms, setTerms] = React.useState(false);
  const [err, setErr] = React.useState({});
  const [st, setSt] = React.useState('idle'); // idle | submitting | success | failed
  const [ref, setRef] = React.useState(null);
  const lock = React.useRef(false);
  const key = React.useRef('idem-' + Math.random().toString(36).slice(2));
  const set = k => e => {
    setF(s => ({
      ...s,
      [k]: e.target.value
    }));
    setErr(x => ({
      ...x,
      [k]: undefined
    }));
  };
  const gov = GOV.find(g => g.v === f.gov);
  const ship = gov && gov.fee != null ? gov.fee : null;
  const sub = unitPrice * qty;
  const total = ship == null ? null : sub + ship;
  const ready = !!size;
  const validate = () => {
    const e = {};
    if (!size) e.size = 'Select a size above before ordering.';
    if (f.name.trim().split(/\s+/).length < 2) e.name = 'Enter your first and last name.';
    if (!/^(\+?20)?0?1[0125]\d{8}$/.test(f.phone.replace(/[\s-]/g, ''))) e.phone = 'Enter a valid Egyptian mobile number (e.g. 01X XXXX XXXX).';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) e.email = 'Enter a valid email address, e.g. name@example.com.';
    if (!f.gov) e.gov = 'Select your governorate to see the shipping fee.';
    if (!f.city.trim()) e.city = 'Enter your city or area.';
    if (!f.street.trim()) e.street = 'Enter your street address.';
    if (!f.bldg.trim()) e.bldg = 'Enter your building number.';
    if (!terms) e.terms = 'Accept the Terms and Privacy Policy to place your order.';
    return e;
  };
  const submit = ev => {
    ev.preventDefault();
    if (lock.current || st === 'submitting' || st === 'success') return; // client guard; server enforces idempotency via key
    const e = validate();
    setErr(e);
    if (Object.keys(e).length) {
      const first = document.querySelector('.pd-co [aria-invalid="true"]');
      first && first.focus();
      return;
    }
    lock.current = true;
    setSt('submitting');
    setTimeout(() => {
      lock.current = false;
      setRef('GOT-' + (1000 + Math.floor(Math.random() * 900)));
      setSt('success');
    }, 1300);
  };
  if (st === 'success') return /*#__PURE__*/React.createElement("div", {
    className: "pd-done",
    role: "status",
    ref: formRef,
    tabIndex: -1
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "circle-check",
    size: 32
  }), /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "Order received (sample reference)"), /*#__PURE__*/React.createElement("p", {
    className: "pd-ref"
  }, ref), /*#__PURE__*/React.createElement("h3", {
    className: "got-h2",
    style: {
      textTransform: 'uppercase'
    }
  }, "Thank you, ", f.name.split(' ')[0]), /*#__PURE__*/React.createElement("p", {
    className: "got-body",
    style: {
      color: 'var(--got-text-muted)',
      margin: 0
    }
  }, "We emailed a confirmation to ", f.email, ". We will call ", f.phone, " to confirm before shipping. Pay ", total != null ? 'EGP ' + total.toLocaleString() : '', " in cash on delivery."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    onClick: () => {
      setSt('idle');
      setRef(null);
      key.current = 'idem-' + Math.random().toString(36).slice(2);
    }
  }, "Order another")));
  return /*#__PURE__*/React.createElement("div", {
    className: "pd-co",
    ref: formRef,
    tabIndex: -1,
    style: {
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement("form", {
    className: "pd-co__form",
    onSubmit: submit,
    noValidate: true,
    "aria-busy": st === 'submitting'
  }, err.size && /*#__PURE__*/React.createElement(Notice, {
    tone: "error"
  }, err.size), st === 'failed' && /*#__PURE__*/React.createElement(Notice, {
    tone: "error",
    title: "We couldn't place your order"
  }, "Your details are saved. Check your connection and try again."), /*#__PURE__*/React.createElement("fieldset", {
    className: "pd-fs"
  }, /*#__PURE__*/React.createElement("legend", {
    className: "got-label"
  }, /*#__PURE__*/React.createElement("b", null, "01"), "Contact"), /*#__PURE__*/React.createElement(TextField, {
    label: "Full name",
    autoComplete: "name",
    value: f.name,
    onChange: set('name'),
    error: err.name
  }), /*#__PURE__*/React.createElement("div", {
    className: "pd-grid2"
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "Mobile number",
    type: "tel",
    inputMode: "tel",
    autoComplete: "tel",
    placeholder: "010 1234 5678",
    value: f.phone,
    onChange: set('phone'),
    error: err.phone
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Email",
    type: "email",
    autoComplete: "email",
    value: f.email,
    onChange: set('email'),
    error: err.email
  }))), /*#__PURE__*/React.createElement("fieldset", {
    className: "pd-fs"
  }, /*#__PURE__*/React.createElement("legend", {
    className: "got-label"
  }, /*#__PURE__*/React.createElement("b", null, "02"), "Delivery"), /*#__PURE__*/React.createElement("div", {
    className: "pd-grid2"
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Governorate",
    options: GOV.map(g => ({
      value: g.v,
      label: g.l
    })),
    value: f.gov,
    onChange: set('gov'),
    error: err.gov,
    autoComplete: "address-level1"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "City / area",
    autoComplete: "address-level2",
    value: f.city,
    onChange: set('city'),
    error: err.city
  })), /*#__PURE__*/React.createElement(TextField, {
    label: "Street address",
    autoComplete: "street-address",
    value: f.street,
    onChange: set('street'),
    error: err.street
  }), /*#__PURE__*/React.createElement("div", {
    className: "pd-grid2"
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "Building number",
    value: f.bldg,
    onChange: set('bldg'),
    error: err.bldg
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Floor / apartment",
    optional: true,
    value: f.floor,
    onChange: set('floor')
  })), /*#__PURE__*/React.createElement(TextField, {
    label: "Delivery instructions",
    optional: true,
    multiline: true,
    value: f.notes,
    onChange: set('notes')
  })), /*#__PURE__*/React.createElement("fieldset", {
    className: "pd-fs"
  }, /*#__PURE__*/React.createElement("legend", {
    className: "got-label"
  }, /*#__PURE__*/React.createElement("b", null, "03"), "Payment"), /*#__PURE__*/React.createElement("label", {
    className: "pd-pay"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: "pay",
    defaultChecked: true
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    className: "got-label"
  }, "Cash on delivery"), /*#__PURE__*/React.createElement("span", {
    className: "got-small",
    style: {
      display: 'block',
      marginTop: 4
    }
  }, "Pay in cash when your order arrives. Keep the exact amount ready."))), /*#__PURE__*/React.createElement(Checkbox, {
    label: /*#__PURE__*/React.createElement(React.Fragment, null, "I accept the ", /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Terms and Conditions"), " and ", /*#__PURE__*/React.createElement("a", {
      href: "#"
    }, "Privacy Policy"), "."),
    checked: terms,
    onChange: e => {
      setTerms(e.target.checked);
      setErr(x => ({
        ...x,
        terms: undefined
      }));
    },
    error: err.terms
  }))), /*#__PURE__*/React.createElement("aside", {
    className: "pd-sum",
    "aria-label": "Order summary"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "got-label",
    style: {
      margin: 0
    }
  }, "Your order"), /*#__PURE__*/React.createElement("div", {
    className: "pd-sum__item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "m"
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: ""
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "got-line__name"
  }, p.name), /*#__PURE__*/React.createElement("p", {
    className: "got-small",
    style: {
      margin: '4px 0 0'
    }
  }, color, " / ", size || 'Select size', " \xB7 Qty ", qty)), /*#__PURE__*/React.createElement(Price, {
    amount: sub
  })), /*#__PURE__*/React.createElement("dl", {
    className: "got-summary",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-summary__row"
  }, /*#__PURE__*/React.createElement("dt", null, "Unit price"), /*#__PURE__*/React.createElement("dd", null, "EGP ", unitPrice.toLocaleString())), /*#__PURE__*/React.createElement("div", {
    className: "got-summary__row"
  }, /*#__PURE__*/React.createElement("dt", null, "Subtotal"), /*#__PURE__*/React.createElement("dd", null, "EGP ", sub.toLocaleString())), /*#__PURE__*/React.createElement("div", {
    className: "got-summary__row"
  }, /*#__PURE__*/React.createElement("dt", null, "Shipping"), /*#__PURE__*/React.createElement("dd", {
    "aria-live": "polite"
  }, ship == null ? 'Select governorate' : 'EGP ' + ship)), /*#__PURE__*/React.createElement("div", {
    className: "got-summary__row got-summary__total"
  }, /*#__PURE__*/React.createElement("dt", null, "Total"), /*#__PURE__*/React.createElement("dd", null, total == null ? '—' : 'EGP ' + total.toLocaleString()))), /*#__PURE__*/React.createElement("p", {
    className: "got-small",
    style: {
      margin: 0
    }
  }, "Shipping and totals are recalculated on the server when you confirm."), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    fullWidth: true,
    loading: st === 'submitting',
    disabled: p.soldOut,
    onClick: submit,
    "data-confirm": true
  }, st === 'submitting' ? 'Placing order' : 'Confirm order'), /*#__PURE__*/React.createElement("p", {
    className: "got-small",
    style: {
      margin: 0,
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 16
  }), "Your cart is not affected by this order.")));
}
window.DirectCheckout = DirectCheckout;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/DirectCheckout.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Home.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Home({
  go,
  openProduct,
  addToCart,
  wish,
  showSlots
}) {
  const P = window.GOT_PRODUCTS.filter(p => !p.hidden);
  const c = window.GOT_HOME;
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);
  const open = p => p ? openProduct(p) : go('shop');
  const spot = P.find(p => p.id === c.spotlightProductId && !p.soldOut);
  const wrap = n => /*#__PURE__*/React.createElement("div", {
    className: "hm-wrap",
    style: {
      paddingBlock: 32
    }
  }, n);
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(HmHero, {
    c: c.hero,
    go: go
  }), /*#__PURE__*/React.createElement(HmDrop, {
    products: P.filter(p => !p.soldOut),
    open: open,
    wish: wish
  }), /*#__PURE__*/React.createElement(HmCategories, {
    products: P,
    go: go
  }), /*#__PURE__*/React.createElement(HmArrivals, {
    products: P,
    open: open,
    wish: wish,
    go: go,
    loading: loading
  }), /*#__PURE__*/React.createElement(HmManifesto, null), /*#__PURE__*/React.createElement(HmSpotlight, {
    product: spot,
    addToCart: addToCart,
    open: open,
    wish: wish
  }), /*#__PURE__*/React.createElement(HmPackaging, null), c.craftsmanship ? null : showSlots && wrap(/*#__PURE__*/React.createElement(CmsSlot, {
    show: true,
    name: "10 \xB7 Product details & craftsmanship",
    needs: "Approved fabric, weight and construction details. No material claims until confirmed by the brand."
  })), c.bestSellers ? null : showSlots && wrap(/*#__PURE__*/React.createElement(CmsSlot, {
    show: true,
    name: "11 \xB7 Best sellers",
    needs: "Renders from real WooCommerce sales data only (total_sales). Hidden before launch."
  })), /*#__PURE__*/React.createElement(HmStory, null), /*#__PURE__*/React.createElement(HmSocial, null), /*#__PURE__*/React.createElement(HmEarly, null), /*#__PURE__*/React.createElement(HmFaq, {
    showSlots: showSlots
  }));
}
function MobileMenu({
  open,
  onClose,
  go,
  nav
}) {
  const {
    IconButton,
    Wordmark,
    Icon
  } = window.GTDesignSystem_f9e073;
  React.useEffect(() => {
    if (!open) return;
    const k = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "hm-menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-scrim",
    style: {
      position: 'absolute'
    },
    onClick: onClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "hm-menu__panel",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-menu__head"
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 24
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "x",
    label: "Close menu",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("nav", {
    className: "hm-menu__nav",
    "aria-label": "Mobile"
  }, nav.map(n => /*#__PURE__*/React.createElement("button", {
    key: n.label,
    onClick: () => {
      onClose();
      go(n.key, n.cat);
    }
  }, n.label, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 20
  })))), /*#__PURE__*/React.createElement("div", {
    className: "hm-menu__foot"
  }, /*#__PURE__*/React.createElement("button", {
    className: "got-header__link",
    style: {
      padding: 0
    },
    onClick: () => {
      onClose();
      go('account');
    }
  }, "Account"), /*#__PURE__*/React.createElement("a", {
    className: "got-header__link",
    style: {
      padding: 0
    },
    href: "https://www.instagram.com/got.official1/"
  }, "Instagram \u2014 @got.official1"), /*#__PURE__*/React.createElement("a", {
    className: "got-header__link",
    style: {
      padding: 0
    },
    href: "https://www.tiktok.com/@got.offical"
  }, "TikTok \u2014 @got.offical"))));
}
function SearchOverlay({
  open,
  onClose,
  openProduct,
  wish
}) {
  const {
    IconButton,
    Icon,
    ProductCard,
    Button
  } = window.GTDesignSystem_f9e073;
  const [q, setQ] = React.useState('');
  const ref = React.useRef();
  React.useEffect(() => {
    if (!open) return;
    setTimeout(() => ref.current && ref.current.focus(), 30);
    const k = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);
  if (!open) return null;
  const t = q.trim().toLowerCase();
  const res = t ? window.GOT_PRODUCTS.filter(p => (p.name + ' ' + p.meta + ' ' + p.cat).toLowerCase().includes(t)) : [];
  return /*#__PURE__*/React.createElement("div", {
    className: "hm-search"
  }, /*#__PURE__*/React.createElement("div", {
    className: "got-scrim",
    style: {
      position: 'absolute'
    },
    onClick: onClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "hm-search__panel",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Search"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-wrap"
  }, /*#__PURE__*/React.createElement("form", {
    role: "search",
    className: "hm-search__bar",
    onSubmit: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 24
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "hm-q",
    className: "got-sr"
  }, "Search products"), /*#__PURE__*/React.createElement("input", {
    id: "hm-q",
    ref: ref,
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search",
    autoComplete: "off"
  }), q && /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    size: "sm",
    onClick: () => setQ('')
  }, "Clear"), /*#__PURE__*/React.createElement(IconButton, {
    icon: "x",
    label: "Close search",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("p", {
    className: "got-eyebrow",
    "aria-live": "polite",
    style: {
      margin: '16px 0 0'
    }
  }, t ? res.length + (res.length === 1 ? ' result' : ' results') + ' for “' + q + '”' : 'Try “hoodie” or “keychain”'), t && !res.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '48px 0 64px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "got-h3",
    style: {
      textTransform: 'uppercase'
    }
  }, "No products match"), /*#__PURE__*/React.createElement("p", {
    className: "got-small",
    style: {
      margin: 0
    }
  }, "Check the spelling or browse the full drop.")) : /*#__PURE__*/React.createElement("div", {
    className: "hm-search__res"
  }, res.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.id
  }, p, wish(p), {
    onClick: () => {
      onClose();
      openProduct(p);
    }
  })))))));
}
Object.assign(window, {
  Home,
  MobileMenu,
  SearchOverlay
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/HomeSections.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const HS = () => window.GTDesignSystem_f9e073;
function CmsSlot({
  show,
  name,
  needs
}) {
  if (!show) return null;
  const {
    Icon
  } = HS();
  return /*#__PURE__*/React.createElement("div", {
    className: "hm-cms",
    role: "note"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-cms__tag"
  }, "Hidden in production \xB7 awaiting content"), /*#__PURE__*/React.createElement("p", {
    className: "got-label",
    style: {
      margin: 0
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    className: "got-small",
    style: {
      margin: 0,
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 16
  }), needs));
}
function Mark({
  id,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: 'hm-slot ' + (className || ''),
    style: {
      background: 'transparent'
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: id,
    shape: "rect",
    fit: "contain",
    placeholder: "Sword monogram"
  }));
}
function HmHero({
  c,
  go
}) {
  const {
    Button
  } = HS();
  return /*#__PURE__*/React.createElement("section", {
    className: "hm-hero",
    "aria-labelledby": "hm-hero-t"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-hero__img hm-slot"
  }, /*#__PURE__*/React.createElement("image-slot", _extends({
    id: "home-hero",
    shape: "rect",
    placeholder: "Drop 01 hero \u2014 real campaign photo (16:9 desktop / 4:5 mobile)"
  }, window.GOT_SLOT('hero', 1920, 1200)))), /*#__PURE__*/React.createElement(Mark, {
    id: "home-hero-mark",
    className: "hm-hero__mark"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hm-hero__in"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-chip"
  }, c.eyebrow, " \u2014 ", window.GOT_HOME.drop.status), /*#__PURE__*/React.createElement("h1", {
    id: "hm-hero-t",
    className: "hm-hero__title"
  }, c.title.map(t => /*#__PURE__*/React.createElement("span", {
    key: t
  }, t))), /*#__PURE__*/React.createElement("div", {
    className: "hm-hero__meta",
    "data-theme": "dark"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-hero__idx"
  }, "EST. 2026 / Alexandria, Egypt"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    arrow: true,
    onClick: () => go('shop')
  }, c.cta))));
}
function HmDrop({
  products,
  open,
  wish
}) {
  const {
    ProductCard,
    Button
  } = HS();
  const d = window.GOT_HOME.drop;
  if (!products.length) return null;
  return /*#__PURE__*/React.createElement("section", {
    className: "hm-sec hm-wrap",
    "aria-labelledby": "hm-drop-t"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-drop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-drop__media hm-slot"
  }, /*#__PURE__*/React.createElement("image-slot", _extends({
    id: "home-drop-editorial",
    shape: "rect",
    placeholder: "Drop 01 editorial \u2014 model / garment"
  }, window.GOT_SLOT('drop-ed', 1000, 1400)))), /*#__PURE__*/React.createElement("div", {
    className: "hm-drop__side"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hm-drop__num",
    "aria-hidden": "true"
  }, "01"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, d.id, " \xB7 ", products.length, " pieces"), /*#__PURE__*/React.createElement("h2", {
    id: "hm-drop-t",
    className: "got-h1",
    style: {
      marginTop: 12
    }
  }, d.title)), /*#__PURE__*/React.createElement("div", {
    className: "hm-drop__grid"
  }, products.slice(0, 2).map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.id
  }, p, wish(p), {
    onClick: () => open(p)
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    arrow: true,
    onClick: () => open(null)
  }, "View the full drop")))));
}
function HmCategories({
  products,
  go
}) {
  const cats = [...new Set(products.map(p => p.cat))].map(cat => ({
    cat,
    list: products.filter(p => p.cat === cat)
  })).filter(c => c.list.length);
  if (cats.length < 2) return null;
  return /*#__PURE__*/React.createElement("section", {
    className: "hm-sec hm-wrap hm-rule",
    "aria-labelledby": "hm-cat-t"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "Shop by category"), /*#__PURE__*/React.createElement("h2", {
    id: "hm-cat-t",
    className: "got-h2",
    style: {
      textTransform: 'uppercase'
    }
  }, "Choose your piece"))), /*#__PURE__*/React.createElement("div", {
    className: "hm-cats"
  }, cats.map((c, ci) => /*#__PURE__*/React.createElement("a", {
    key: c.cat,
    href: "#",
    className: "hm-cat",
    onClick: e => {
      e.preventDefault();
      go('shop', c.cat);
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: c.list[0].image,
    alt: "",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hm-cat__no",
    "aria-hidden": "true"
  }, "0", ci + 1), /*#__PURE__*/React.createElement("span", {
    className: "hm-cat__lbl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hm-cat__name"
  }, c.cat), /*#__PURE__*/React.createElement("span", {
    className: "hm-cat__count"
  }, c.list.length, " ", c.list.length === 1 ? 'product' : 'products', " \u2192"))))));
}
function HmArrivals({
  products,
  open,
  wish,
  go,
  loading
}) {
  const {
    ProductCard,
    Button,
    Skeleton
  } = HS();
  if (!loading && !products.length) return null;
  return /*#__PURE__*/React.createElement("section", {
    className: "hm-sec hm-wrap hm-rule",
    "aria-labelledby": "hm-new-t"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "Latest"), /*#__PURE__*/React.createElement("h2", {
    id: "hm-new-t",
    className: "got-h2",
    style: {
      textTransform: 'uppercase'
    }
  }, "New arrivals")), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    onClick: () => go('shop')
  }, "View all")), /*#__PURE__*/React.createElement("div", {
    className: "hm-rail",
    role: "list"
  }, loading ? [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("div", {
    role: "listitem",
    key: i
  }, /*#__PURE__*/React.createElement(Skeleton, {
    variant: "card"
  }))) : products.map(p => /*#__PURE__*/React.createElement("div", {
    role: "listitem",
    key: p.id
  }, /*#__PURE__*/React.createElement(ProductCard, _extends({}, p, wish(p), {
    onClick: () => open(p)
  }))))));
}
function HmManifesto() {
  const c = window.GOT_HOME;
  return /*#__PURE__*/React.createElement("section", {
    className: "hm-sec hm-man hm-rule",
    "aria-label": "Manifesto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-wrap"
  }, /*#__PURE__*/React.createElement("p", {
    className: "hm-man__lines"
  }, c.manifesto.map(l => /*#__PURE__*/React.createElement("span", {
    key: l
  }, l === 'different' ? /*#__PURE__*/React.createElement("mark", {
    className: "hm-mark"
  }, l) : l))), /*#__PURE__*/React.createElement("div", {
    className: "hm-man__foot"
  }, /*#__PURE__*/React.createElement(Mark, {
    id: "home-manifesto-mark",
    className: "hm-man__mark"
  }), /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "G\xD8T / Manifesto"), /*#__PURE__*/React.createElement("ul", {
    className: "hm-man__list"
  }, c.manifestoSupport.map((l, i) => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("span", null, "0", i + 1), /*#__PURE__*/React.createElement("span", null, l)))))));
}
function HmSpotlight({
  product: p,
  addToCart,
  open,
  wish
}) {
  const {
    Badge,
    Price,
    ColorSelector,
    SizeSelector,
    Button,
    IconButton
  } = HS();
  const [color, setColor] = React.useState(p ? p.colors[0].name : null);
  const [size, setSize] = React.useState(null);
  const [err, setErr] = React.useState(null);
  const [busy, setBusy] = React.useState(false);
  if (!p) return null;
  const w = wish(p);
  const add = () => {
    if (!size) {
      setErr('Select a size to continue.');
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      addToCart({
        id: p.id + color + size,
        image: p.image,
        name: p.name,
        variant: color + ' / ' + size,
        price: p.price,
        qty: 1,
        max: Math.min(10, p.stock)
      });
    }, 500);
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "hm-sec hm-wrap hm-rule",
    "aria-labelledby": "hm-spot-t"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-spot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-spot__media"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-slot"
  }, /*#__PURE__*/React.createElement("img", {
    src: p.image,
    alt: p.name + ', ' + color
  })), /*#__PURE__*/React.createElement("div", {
    className: "hm-slot"
  }, /*#__PURE__*/React.createElement("img", {
    src: p.altImage,
    alt: "",
    loading: "lazy"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hm-spot__info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "Spotlight"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, p.badge && /*#__PURE__*/React.createElement(Badge, {
    tone: "new"
  }, p.badge), /*#__PURE__*/React.createElement(Badge, {
    tone: "drop"
  }, "Drop 01")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    id: "hm-spot-t",
    className: "got-h2",
    style: {
      textTransform: 'uppercase'
    }
  }, p.name), /*#__PURE__*/React.createElement(IconButton, {
    icon: "heart",
    variant: "outline",
    label: w.wishlisted ? 'Remove from wishlist' : 'Add to wishlist',
    "aria-pressed": w.wishlisted,
    onClick: w.onWishlist,
    style: w.wishlisted ? {
      background: 'var(--got-cta-bg)',
      color: 'var(--got-cta-text)'
    } : undefined
  })), /*#__PURE__*/React.createElement(Price, {
    amount: p.price
  }), /*#__PURE__*/React.createElement(ColorSelector, {
    colors: p.colors,
    value: color,
    onChange: setColor
  }), /*#__PURE__*/React.createElement(SizeSelector, {
    sizes: p.sizes,
    value: size,
    onChange: s => {
      setSize(s);
      setErr(null);
    },
    error: err
  }), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    fullWidth: true,
    loading: busy,
    disabled: p.soldOut,
    onClick: add
  }, "Add to cart"), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    onClick: () => open(p)
  }, "View full details"))));
}
function HmPackaging() {
  const items = window.GOT_HOME.packaging;
  if (!items || !items.length) return null;
  return /*#__PURE__*/React.createElement("section", {
    className: "hm-sec hm-pack",
    "aria-labelledby": "hm-pack-t",
    "data-theme": "dark"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "The unboxing"), /*#__PURE__*/React.createElement("h2", {
    id: "hm-pack-t",
    className: "got-h1",
    style: {
      color: 'var(--got-white)'
    }
  }, "More than", /*#__PURE__*/React.createElement("br", null), "just a hoodie"))), /*#__PURE__*/React.createElement("div", {
    className: "hm-pack__grid"
  }, items.map(i => /*#__PURE__*/React.createElement("figure", {
    key: i.id,
    className: "hm-pack__item",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-slot"
  }, /*#__PURE__*/React.createElement("image-slot", _extends({
    id: 'home-' + i.id,
    shape: "rect",
    placeholder: 'Packaging — ' + i.note.toLowerCase()
  }, window.GOT_SLOT(i.id, 800, 1000)))), /*#__PURE__*/React.createElement("figcaption", {
    className: "hm-pack__cap"
  }, /*#__PURE__*/React.createElement("p", null, i.caption), /*#__PURE__*/React.createElement("span", null, i.note)))))));
}
function HmStory() {
  const s = window.GOT_HOME.story;
  return /*#__PURE__*/React.createElement("section", {
    className: "hm-sec hm-wrap hm-rule",
    "aria-labelledby": "hm-story-t"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-story"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "The brand"), /*#__PURE__*/React.createElement("h2", {
    id: "hm-story-t",
    className: "got-h1",
    style: {
      marginTop: 12
    }
  }, "Born to be different")), /*#__PURE__*/React.createElement("dl", {
    className: "hm-story__facts",
    style: {
      margin: 0
    }
  }, s.facts.map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("dt", {
    className: "got-eyebrow"
  }, k), /*#__PURE__*/React.createElement("dd", null, v))))), /*#__PURE__*/React.createElement("div", {
    className: "hm-story__img hm-slot"
  }, /*#__PURE__*/React.createElement("image-slot", _extends({
    id: "home-story",
    shape: "rect",
    placeholder: "Brand / Alexandria editorial photo"
  }, window.GOT_SLOT('story', 1200, 960))))));
}
function HmSocial() {
  const {
    Icon
  } = HS();
  const s = window.GOT_HOME.social;
  return /*#__PURE__*/React.createElement("section", {
    className: "hm-sec hm-wrap hm-rule",
    "aria-labelledby": "hm-soc-t"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-soc"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "Community"), /*#__PURE__*/React.createElement("h2", {
    id: "hm-soc-t",
    className: "got-h2",
    style: {
      textTransform: 'uppercase',
      marginTop: 12
    }
  }, "Follow the drop")), /*#__PURE__*/React.createElement("div", {
    className: "hm-soc__links"
  }, s.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    className: "hm-soc__link",
    href: l.href,
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("strong", null, l.label), /*#__PURE__*/React.createElement("span", null, l.handle)), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right",
    size: 24
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "hm-soc__grid",
    "aria-label": "Latest posts"
  }, [1, 2, 3, 4, 5, 6].map(n => /*#__PURE__*/React.createElement("div", {
    key: n,
    className: "hm-slot"
  }, /*#__PURE__*/React.createElement("image-slot", _extends({
    id: 'home-post-' + n,
    shape: "rect",
    placeholder: 'Post ' + n
  }, window.GOT_SLOT('post' + n, 500, 500))))))));
}
function HmEarly() {
  const {
    EarlyAccessForm
  } = HS();
  return /*#__PURE__*/React.createElement("section", {
    className: "hm-sec hm-lime",
    "data-theme": "light",
    "aria-labelledby": "hm-ea-t"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-ea"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "Next drop"), /*#__PURE__*/React.createElement("h2", {
    id: "hm-ea-t",
    className: "got-display",
    style: {
      marginTop: 12,
      fontSize: 'clamp(2.75rem,8vw,6.5rem)'
    }
  }, "Hear about", /*#__PURE__*/React.createElement("br", null), "it first"), /*#__PURE__*/React.createElement("p", {
    className: "got-body",
    style: {
      margin: '16px 0 0'
    }
  }, "One confirmation email first. Your address is never shared.")), /*#__PURE__*/React.createElement(EarlyAccessForm, {
    cta: "Get early access"
  }))));
}
function HmFaq({
  showSlots
}) {
  const {
    Accordion,
    Button
  } = HS();
  const items = window.GOT_HOME.faq.filter(f => f.content || showSlots).map(f => ({
    title: f.title,
    content: f.content || /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--color-warning)'
      }
    }, "Hidden until the approved Return & Exchange policy is published.")
  }));
  if (!items.length) return null;
  return /*#__PURE__*/React.createElement("section", {
    className: "hm-sec hm-wrap hm-rule",
    "aria-labelledby": "hm-faq-t"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hm-faq"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "Shopping info"), /*#__PURE__*/React.createElement("h2", {
    id: "hm-faq-t",
    className: "got-h2",
    style: {
      textTransform: 'uppercase'
    }
  }, "Before you order"), /*#__PURE__*/React.createElement(Button, {
    variant: "link"
  }, "All FAQs")), /*#__PURE__*/React.createElement(Accordion, {
    items: items,
    defaultOpen: 0
  })));
}
Object.assign(window, {
  CmsSlot,
  HmHero,
  HmDrop,
  HmCategories,
  HmArrivals,
  HmManifesto,
  HmSpotlight,
  HmPackaging,
  HmStory,
  HmSocial,
  HmEarly,
  HmFaq
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/HomeSections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Product.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Product({
  product: p,
  addToCart,
  go,
  openProduct,
  wish = () => ({})
}) {
  const {
    Badge,
    Price,
    ColorSelector,
    SizeSelector,
    QuantityStepper,
    Button,
    IconButton,
    Accordion,
    Icon,
    Modal,
    ProductCard
  } = window.GTDesignSystem_f9e073;
  const H = window.GOT_HOME;
  const [color, setColor] = React.useState(p.colors[0].name);
  const [size, setSize] = React.useState(p.sizes.length === 1 && p.sizes[0].available !== false ? p.sizes[0].label : null);
  const [qty, setQty] = React.useState(1);
  const [err, setErr] = React.useState(null);
  const [img, setImg] = React.useState(0);
  const [guide, setGuide] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [coVisible, setCoVisible] = React.useState(false);
  const [heroCta, setHeroCta] = React.useState(true);
  const coRef = React.useRef();
  const sizeRef = React.useRef();
  const ctaRef = React.useRef();
  const trackRef = React.useRef();
  const w = wish(p);
  const imgs = [0, 1, 2, 3].map(i => window.GOT_IMG(p.id + color + i, 1000, 1250));
  const max = Math.max(1, Math.min(10, p.stock));
  const low = !p.soldOut && p.stock <= 3;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  React.useEffect(() => {
    const a = new IntersectionObserver(([e]) => setCoVisible(e.isIntersecting), {
      threshold: 0.05
    });
    const b = new IntersectionObserver(([e]) => setHeroCta(e.isIntersecting), {
      threshold: 0
    });
    coRef.current && a.observe(coRef.current);
    ctaRef.current && b.observe(ctaRef.current);
    return () => {
      a.disconnect();
      b.disconnect();
    };
  }, []);
  const pick = i => {
    setImg(i);
    const t = trackRef.current;
    if (t) t.scrollTo({
      left: t.clientWidth * i,
      behavior: reduce ? 'auto' : 'smooth'
    });
  };
  const onScroll = e => {
    const t = e.currentTarget;
    const i = Math.round(t.scrollLeft / t.clientWidth);
    if (i !== img) setImg(i);
  };
  const orderNow = () => {
    if (!size) {
      setErr('Select a size to continue.');
      const el = sizeRef.current;
      if (el) window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 140,
        behavior: reduce ? 'auto' : 'smooth'
      });
      return;
    }
    const el = coRef.current;
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 96,
      behavior: reduce ? 'auto' : 'smooth'
    });
    setTimeout(() => {
      const f = el.querySelector('input');
      f && f.focus({
        preventScroll: true
      });
    }, reduce ? 0 : 500);
  };
  const add = () => {
    if (!size) {
      setErr('Select a size to continue.');
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      addToCart({
        id: p.id + color + size,
        image: imgs[0],
        name: p.name,
        variant: color + ' / ' + size,
        price: p.price,
        qty,
        max
      });
    }, 500);
  };
  const related = window.GOT_PRODUCTS.filter(x => x.id !== p.id && !x.hidden).slice(0, 4);
  const faq = [{
    title: 'How do I choose the correct size?',
    content: 'Open the size guide next to the size selector.'
  }, {
    title: 'Is Cash on Delivery available?',
    content: 'Yes. You pay in cash when your order arrives.'
  }, {
    title: 'Which governorates are supported?',
    content: 'Alexandria, Cairo / Giza and other Egyptian governorates. Select yours at checkout to see the fee.'
  }, {
    title: 'How much does shipping cost?',
    content: 'The fee depends on your governorate and is shown in the order summary before you confirm.'
  }, {
    title: 'How can I contact GØT?',
    content: /*#__PURE__*/React.createElement(React.Fragment, null, "Email ", /*#__PURE__*/React.createElement("a", {
      href: "mailto:gotoffical1@gmail.com"
    }, "gotoffical1@gmail.com"), " or message ", /*#__PURE__*/React.createElement("a", {
      href: "https://www.instagram.com/got.official1/"
    }, "@got.official1"), " on Instagram.")
  }];
  return /*#__PURE__*/React.createElement("main", {
    className: "pd"
  }, /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Breadcrumb",
    className: "got-eyebrow pd-crumb"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('shop');
    },
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "Drop 01"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 12
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--got-text)'
    }
  }, p.name)), /*#__PURE__*/React.createElement("section", {
    className: "pd-hero",
    "aria-label": "Product"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pd-gal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pd-gal__thumbs",
    role: "group",
    "aria-label": "Product images"
  }, imgs.map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: "pd-thumb",
    "aria-current": img === i,
    "aria-label": 'Show image ' + (i + 1),
    onClick: () => pick(i)
  }, /*#__PURE__*/React.createElement("img", {
    src: s,
    alt: "",
    loading: "lazy"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "pd-gal__main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pd-gal__track",
    ref: trackRef,
    onScroll: onScroll,
    tabIndex: 0,
    "aria-label": "Product gallery, swipe for more"
  }, imgs.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("img", {
    src: s,
    alt: p.name + ', ' + color + ', view ' + (i + 1),
    loading: i ? 'lazy' : 'eager',
    fetchpriority: i ? undefined : 'high',
    width: "1000",
    height: "1250"
  })))), /*#__PURE__*/React.createElement("span", {
    className: "pd-gal__count",
    "aria-hidden": "true"
  }, img + 1, " / ", imgs.length), /*#__PURE__*/React.createElement(IconButton, {
    className: "pd-gal__zoom",
    icon: "zoom-in",
    label: "Zoom image",
    variant: "outline",
    onClick: () => window.open(imgs[img], '_blank')
  }))), /*#__PURE__*/React.createElement("div", {
    className: "pd-info"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, p.soldOut ? /*#__PURE__*/React.createElement(Badge, {
    tone: "soldout"
  }, "Sold out") : p.badge && /*#__PURE__*/React.createElement(Badge, {
    tone: "new"
  }, p.badge), /*#__PURE__*/React.createElement(Badge, {
    tone: "drop"
  }, "Drop 01")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "got-h1",
    style: {
      fontSize: 'clamp(2rem,6vw,3.5rem)'
    }
  }, p.name), /*#__PURE__*/React.createElement(IconButton, {
    icon: "heart",
    variant: "outline",
    label: w.wishlisted ? 'Remove from wishlist' : 'Add to wishlist',
    "aria-pressed": !!w.wishlisted,
    onClick: w.onWishlist,
    style: w.wishlisted ? {
      background: 'var(--got-cta-bg)',
      color: 'var(--got-cta-text)'
    } : undefined
  })), /*#__PURE__*/React.createElement(Price, {
    amount: p.price,
    className: ""
  })), /*#__PURE__*/React.createElement(ColorSelector, {
    colors: p.colors,
    value: color,
    onChange: c => {
      setColor(c);
      setImg(0);
      trackRef.current && (trackRef.current.scrollLeft = 0);
    }
  }), /*#__PURE__*/React.createElement("div", {
    ref: sizeRef
  }, /*#__PURE__*/React.createElement(SizeSelector, {
    sizes: p.sizes,
    value: size,
    onChange: s => {
      setSize(s);
      setErr(null);
    },
    error: err,
    aside: /*#__PURE__*/React.createElement(Button, {
      variant: "link",
      size: "sm",
      iconLeft: "ruler",
      onClick: () => setGuide(true)
    }, "Size guide")
  })), /*#__PURE__*/React.createElement("div", {
    className: "pd-qtyrow"
  }, /*#__PURE__*/React.createElement(QuantityStepper, {
    value: qty,
    max: max,
    onChange: setQty
  }), /*#__PURE__*/React.createElement("span", {
    className: "pd-stock",
    style: {
      marginLeft: 'auto'
    },
    "aria-live": "polite"
  }, p.soldOut ? 'Sold out' : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: low ? 'pd-stock--low' : '',
    style: {
      display: 'contents'
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      background: low ? 'var(--color-warning)' : 'var(--color-success)'
    }
  })), low ? 'Only ' + p.stock + ' left' : 'In stock'))), /*#__PURE__*/React.createElement("div", {
    className: "pd-actions",
    ref: ctaRef
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    fullWidth: true,
    disabled: p.soldOut,
    onClick: orderNow,
    arrow: true
  }, "Order now"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    fullWidth: true,
    disabled: p.soldOut,
    loading: busy,
    onClick: add
  }, "Add to cart")), /*#__PURE__*/React.createElement("div", {
    className: "pd-mini"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "package",
    size: 18
  }), "Cash on delivery"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "truck",
    size: 18
  }), "Shipping across Egypt \u2014 fee shown at checkout")))), /*#__PURE__*/React.createElement("section", {
    className: "pd-sec",
    "aria-labelledby": "pd-trust-t"
  }, /*#__PURE__*/React.createElement("h2", {
    id: "pd-trust-t",
    className: "got-sr"
  }, "Shopping information"), /*#__PURE__*/React.createElement("div", {
    className: "pd-trust"
  }, [['package', 'Cash on delivery', 'Pay in cash when your order arrives.'], ['truck', 'Shipping', 'Alexandria, Cairo / Giza and other governorates. Fee shown before you confirm.'], ['lock', 'Secure ordering', 'Totals and stock are checked on our server when you confirm.'], ['mail', 'Support', 'gotoffical1@gmail.com or Instagram @got.official1.']].map(([ic, t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 24
  }), /*#__PURE__*/React.createElement("h3", {
    className: "got-label",
    style: {
      margin: 0
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    className: "got-small",
    style: {
      margin: 0
    }
  }, d))))), p.specs && /*#__PURE__*/React.createElement("section", {
    className: "pd-sec",
    "aria-labelledby": "pd-spec-t"
  }, /*#__PURE__*/React.createElement("h2", {
    id: "pd-spec-t",
    className: "got-h2",
    style: {
      textTransform: 'uppercase',
      marginBottom: 32
    }
  }, "Details"), /*#__PURE__*/React.createElement("dl", {
    className: "pd-spec",
    style: {
      margin: 0
    }
  }, Object.entries(p.specs).map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("dt", {
    className: "got-eyebrow"
  }, k), /*#__PURE__*/React.createElement("dd", null, v))))), /*#__PURE__*/React.createElement("section", {
    className: "pd-sec",
    "aria-label": "Story"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pd-story"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "pd-story__big"
  }, /*#__PURE__*/React.createElement("span", null, "Forged"), /*#__PURE__*/React.createElement("span", null, "to be"), /*#__PURE__*/React.createElement("span", null, "different")), /*#__PURE__*/React.createElement("div", {
    className: "pd-story__imgs"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: imgs[1],
    alt: "",
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: imgs[2],
    alt: "",
    loading: "lazy"
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "pd-sec",
    "aria-labelledby": "pd-pack-t"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pd-pack"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "Packaging"), /*#__PURE__*/React.createElement("h2", {
    id: "pd-pack-t",
    className: "got-h1"
  }, "More than", /*#__PURE__*/React.createElement("br", null), "just a hoodie"), /*#__PURE__*/React.createElement("p", {
    className: "got-small",
    style: {
      margin: 0
    }
  }, "Brand packaging imagery. Photographed items are shown for presentation; the contents of your order are listed in the order summary.")), /*#__PURE__*/React.createElement("div", {
    className: "pd-pack__imgs"
  }, ['pk-box', 'pk-tag', 'pk-qr'].map(k => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("img", {
    src: window.GOT_IMG(k, 600, 750),
    alt: "",
    loading: "lazy"
  })))))), /*#__PURE__*/React.createElement("section", {
    className: "pd-sec",
    "aria-labelledby": "pd-ship-t"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pd-ship"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "Shipping & returns"), /*#__PURE__*/React.createElement("h2", {
    id: "pd-ship-t",
    className: "got-h2",
    style: {
      textTransform: 'uppercase'
    }
  }, "Delivery across Egypt"), /*#__PURE__*/React.createElement("p", {
    className: "got-small",
    style: {
      margin: 0
    }
  }, "Returns and exchange policy: pending approved text.")), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("caption", {
    className: "got-sr"
  }, "Shipping fees by governorate (sample values)"), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Governorate"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Fee (sample)"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Alexandria"), /*#__PURE__*/React.createElement("td", null, "EGP 60")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Cairo / Giza"), /*#__PURE__*/React.createElement("td", null, "EGP 75")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Other governorates"), /*#__PURE__*/React.createElement("td", null, "EGP 90")))))), /*#__PURE__*/React.createElement("section", {
    className: "pd-sec",
    id: "checkout",
    "aria-labelledby": "pd-co-t"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "Order \u2014 cash on delivery"), /*#__PURE__*/React.createElement("h2", {
    id: "pd-co-t",
    className: "got-h1"
  }, "Order this piece")), /*#__PURE__*/React.createElement(DirectCheckout, {
    product: p,
    color: color,
    size: size,
    qty: qty,
    image: imgs[0],
    unitPrice: p.price,
    formRef: coRef
  })), /*#__PURE__*/React.createElement("section", {
    className: "pd-sec",
    "aria-labelledby": "pd-faq-t"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pd-ship"
  }, /*#__PURE__*/React.createElement("h2", {
    id: "pd-faq-t",
    className: "got-h2",
    style: {
      textTransform: 'uppercase'
    }
  }, "Questions"), /*#__PURE__*/React.createElement(Accordion, {
    items: faq,
    defaultOpen: 0
  }))), related.length > 0 && /*#__PURE__*/React.createElement("section", {
    className: "pd-sec",
    "aria-labelledby": "pd-rel-t"
  }, /*#__PURE__*/React.createElement("h2", {
    id: "pd-rel-t",
    className: "got-h2",
    style: {
      textTransform: 'uppercase',
      marginBottom: 32
    }
  }, "More from Drop 01"), /*#__PURE__*/React.createElement("div", {
    className: "pd-rel"
  }, related.map(r => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: r.id
  }, r, wish(r), {
    onClick: () => openProduct(r)
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "pd-sec pd-final",
    "aria-label": "Order"
  }, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "Drop 01"), /*#__PURE__*/React.createElement("h2", {
    className: "got-display"
  }, "Ready for", /*#__PURE__*/React.createElement("br", null), "Drop 01?"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    arrow: true,
    onClick: () => window.scrollTo({
      top: 0,
      behavior: reduce ? 'auto' : 'smooth'
    })
  }, "Choose your size")), /*#__PURE__*/React.createElement("div", {
    className: "pd-sticky",
    "data-hidden": heroCta || coVisible || p.soldOut,
    "aria-hidden": heroCta || coVisible
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow",
    style: {
      display: 'block'
    }
  }, p.name), /*#__PURE__*/React.createElement(Price, {
    amount: p.price * qty
  })), /*#__PURE__*/React.createElement(Button, {
    onClick: orderNow,
    tabIndex: heroCta || coVisible ? -1 : 0
  }, "Order now")), /*#__PURE__*/React.createElement(Modal, {
    open: guide,
    title: "Size guide",
    onClose: () => setGuide(false),
    footer: /*#__PURE__*/React.createElement(Button, {
      onClick: () => setGuide(false)
    }, "Done")
  }, /*#__PURE__*/React.createElement("p", {
    className: "got-small",
    style: {
      margin: '0 0 16px'
    }
  }, "Measurements in centimetres will appear here once the approved Drop 01 size chart is supplied."), /*#__PURE__*/React.createElement("div", {
    className: "pd-size-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "pd-size"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Size"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Chest"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Length"), /*#__PURE__*/React.createElement("th", {
    scope: "col"
  }, "Sleeve"))), /*#__PURE__*/React.createElement("tbody", null, p.sizes.map(s => /*#__PURE__*/React.createElement("tr", {
    key: s.label
  }, /*#__PURE__*/React.createElement("th", {
    scope: "row"
  }, s.label), /*#__PURE__*/React.createElement("td", null, "\u2014"), /*#__PURE__*/React.createElement("td", null, "\u2014"), /*#__PURE__*/React.createElement("td", null, "\u2014"))))))));
}
window.Product = Product;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Product.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Shop.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Shop({
  openProduct,
  initialTab = 'All',
  wish = () => ({})
}) {
  const {
    FilterBar,
    ProductCard,
    Skeleton,
    Button,
    Modal,
    Checkbox
  } = window.GTDesignSystem_f9e073;
  const [tab, setTab] = React.useState(initialTab);
  const [sort, setSort] = React.useState('Newest');
  const [loading, setLoading] = React.useState(false);
  const [inStock, setInStock] = React.useState(false);
  const [panel, setPanel] = React.useState(false);
  const pick = t => {
    setTab(t);
    setLoading(true);
    setTimeout(() => setLoading(false), 450);
  };
  let list = window.GOT_PRODUCTS.filter(p => (tab === 'All' || p.cat === tab) && (!inStock || !p.soldOut));
  if (sort === 'Price: low to high') list = [...list].sort((a, b) => a.price - b.price);
  if (sort === 'Price: high to low') list = [...list].sort((a, b) => b.price - a.price);
  const few = list.length <= 2;
  const gridStyle = few ? {
    gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
    maxWidth: 820
  } : {
    gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%/2 - 8px,240px),1fr))'
  };
  const scoped = tab !== 'All' || inStock;
  return /*#__PURE__*/React.createElement("main", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '64px var(--gutter) 96px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow",
    style: {
      color: 'var(--accent-ink)'
    }
  }, "Collection 01"), /*#__PURE__*/React.createElement("h1", {
    className: "got-h1",
    style: {
      margin: '12px 0 40px'
    }
  }, "Drop 01"), /*#__PURE__*/React.createElement(FilterBar, {
    tabs: ['All', 'Hoodies', 'Accessories'],
    active: tab,
    onTab: pick,
    count: list.length,
    sort: sort,
    onSort: setSort,
    filterCount: inStock ? 1 : 0,
    onFilters: () => setPanel(true)
  }), list.length === 0 && !loading ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '96px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "got-h3",
    style: {
      textTransform: 'uppercase'
    }
  }, inStock ? 'No products match these filters' : 'No products in this collection yet'), /*#__PURE__*/React.createElement("p", {
    className: "got-small",
    style: {
      margin: 0
    }
  }, inStock ? 'Try removing a filter.' : 'Check the full drop instead.'), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => {
      setInStock(false);
      pick('All');
    }
  }, inStock ? 'Clear all filters' : 'View all products')) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: '48px 16px',
      marginTop: 32,
      ...gridStyle
    }
  }, loading ? [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement(Skeleton, {
    key: i,
    variant: "card"
  })) : list.map(p => /*#__PURE__*/React.createElement(ProductCard, _extends({
    key: p.id
  }, p, wish(p), {
    onClick: () => openProduct(p)
  })))), /*#__PURE__*/React.createElement(Modal, {
    open: panel,
    title: "Filter",
    onClose: () => setPanel(false),
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: () => setInStock(false)
    }, "Clear all"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      onClick: () => setPanel(false)
    }, "Show ", list.length, " ", list.length === 1 ? 'product' : 'products'))
  }, /*#__PURE__*/React.createElement(Checkbox, {
    label: "In stock only",
    checked: inStock,
    onChange: e => setInStock(e.target.checked)
  })));
}
window.Shop = Shop;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Shop.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/ThankYou.jsx
try { (() => {
function ThankYou({
  order,
  go
}) {
  const {
    Button,
    Icon,
    OrderSummary,
    CartLine,
    Badge
  } = window.GTDesignSystem_f9e073;
  const items = order && order.items && order.items.length ? order.items : [{
    id: 'x',
    name: 'Drop 01 Hoodie',
    variant: 'Black / M',
    price: 1450,
    qty: 1,
    image: window.GOT_IMG('h1Black0', 200, 250)
  }];
  const sub = items.reduce((a, i) => a + i.price * i.qty, 0);
  const next = [['mail', 'Confirmation email', 'A copy of this order is on its way to your inbox.'], ['phone', 'We call to confirm', 'Expect a call on your mobile number before we ship your cash-on-delivery order.'], ['truck', 'Shipping', 'Your order is shipped to the address below. Pay in cash when it arrives.']];
  const Block = ({
    label,
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: '20px 0',
      borderBottom: '1px solid var(--got-border)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "got-small",
    style: {
      color: 'var(--got-text)'
    }
  }, children));
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("section", {
    style: {
      borderBottom: '1px solid var(--got-border)',
      padding: '120px var(--gutter) 96px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 24,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      display: 'grid',
      placeItems: 'center',
      background: 'var(--got-cta-bg)',
      color: 'var(--got-cta-text)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 28,
    strokeWidth: 2
  })), /*#__PURE__*/React.createElement("span", {
    className: "got-eyebrow"
  }, "Order #1001 \xB7 Received (sample)"), /*#__PURE__*/React.createElement("h1", {
    className: "got-display"
  }, "Thank you, Karim"), /*#__PURE__*/React.createElement("p", {
    className: "got-body",
    style: {
      color: 'var(--got-text-muted)',
      margin: 0,
      maxWidth: '52ch'
    }
  }, "Your order is in. Welcome to G\xD8T."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    arrow: true,
    onClick: () => go('shop')
  }, "Continue shopping"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    onClick: () => go('confirm')
  }, "Track order"))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '80px var(--gutter) 96px',
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr)',
      gap: 80,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 56
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "got-label",
    style: {
      margin: '0 0 24px'
    }
  }, "What happens next"), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      borderTop: '1px solid var(--got-border)'
    }
  }, next.map(([ic, t, d], i) => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'grid',
      gridTemplateColumns: '40px minmax(0,1fr)',
      gap: 16,
      padding: '24px 0',
      borderBottom: '1px solid var(--got-border)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--got-text-muted)',
      paddingTop: 2
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 20
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "got-label",
    style: {
      margin: 0
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    className: "got-small",
    style: {
      margin: '6px 0 0'
    }
  }, d))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0 32px'
    }
  }, /*#__PURE__*/React.createElement(Block, {
    label: "Contact"
  }, "karim@example.com", /*#__PURE__*/React.createElement("br", null), "010 1234 5678"), /*#__PURE__*/React.createElement(Block, {
    label: "Payment"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      flexWrap: 'wrap',
      whiteSpace: 'nowrap'
    }
  }, "Cash on delivery ", /*#__PURE__*/React.createElement(Badge, {
    tone: "outline"
  }, "COD"))), /*#__PURE__*/React.createElement(Block, {
    label: "Shipping to"
  }, "Karim A.", /*#__PURE__*/React.createElement("br", null), "Smouha, Alexandria 21523", /*#__PURE__*/React.createElement("br", null), "Egypt"), /*#__PURE__*/React.createElement(Block, {
    label: "Shipping method"
  }, "Alexandria \u2014 standard"))), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'sticky',
      top: 120,
      background: 'var(--got-surface)',
      border: '1px solid var(--got-border)',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "got-label",
    style: {
      margin: 0
    }
  }, "Your order"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, items.map(i => /*#__PURE__*/React.createElement("div", {
    key: i.id,
    style: {
      display: 'grid',
      gridTemplateColumns: '72px minmax(0,1fr) auto',
      gap: 16,
      padding: '20px 0',
      borderBottom: '1px solid var(--got-border)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '4/5',
      background: 'var(--got-surface-2)'
    }
  }, i.image && /*#__PURE__*/React.createElement("img", {
    src: i.image,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "got-line__name"
  }, i.name), /*#__PURE__*/React.createElement("p", {
    className: "got-small",
    style: {
      margin: '4px 0 0'
    }
  }, i.variant, " \xB7 Qty ", i.qty)), /*#__PURE__*/React.createElement("span", {
    className: "got-price"
  }, "EGP ", (i.price * i.qty).toLocaleString())))), /*#__PURE__*/React.createElement(OrderSummary, {
    subtotal: sub,
    shipping: 60,
    note: "Pay cash on delivery."
  }))));
}
window.ThankYou = ThankYou;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/ThankYou.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/data.js
try { (() => {
// SAMPLE DATA — placeholder catalog for the mock. Names/prices are not approved; real Drop 01 list is TBD by brand owner.
// PLACEHOLDER PHOTOGRAPHY — free Unsplash photos (Unsplash License), desaturated via sat=-100. NOT GØT products. Replace with real merchandise shots.
window.GOT_PHOTOS = {
  hero: ['1513789181297-6f2ec112c0bc', 'JC Gellidon', 'jcgellidon'],
  drop: ['1677538537484-324385aff147', 'Mohamed youssry', 'youssry99'],
  h1: ['1647797819874-f51a8a8fc5c0', 'MEHRAX', 'mehrax'],
  h1b: ['1615320876716-0fc796a5010f', 'Mihajlo Šebalj', 'photo_diary'],
  h2: ['1732475530155-90158f3b5f79', 'David Banjo', 'davidbvnjo'],
  h2b: ['1732475530118-0db47f851736', 'David Banjo', 'davidbvnjo'],
  a1: ['1630853010132-68f3aea24257', 'Tommy Diner', 'tomydiner'],
  a1b: ['1590156351885-f73330202730', 'Laura Chouette', 'laurachouette'],
  a2: ['1631477076114-9123f721b9dc', 'Milad Fakurian', 'fakurian'],
  a2b: ['1669351004430-8a5c1455e45f', 'Aakash Dhage', 'aakashdhage'],
  box: ['1630853010132-68f3aea24257', 'Tommy Diner', 'tomydiner'],
  tag: ['1590156351885-f73330202730', 'Laura Chouette', 'laurachouette'],
  qr: ['1771848194108-b86156b6ca72', 'Egor Komarov', 'egorkomarov'],
  story: ['1673092147872-5ddb03194341', 'Rafay Ansari', 'rafayyansari'],
  pack: ['1752679813117-49fdab167868', 'Atul', 'atulr'],
  post1: ['1610582144787-eda2e6f293b4', 'Axel Antas-Bergkvist', 'aabergkvist'],
  post2: ['1614214191247-5b2d3a734f1b', 'Sonny Mauricio', 'northernstatemedia'],
  post3: ['1622567893612-a5345baa5c9a', 'whereslugo', 'whereslugo'],
  post4: ['1639379789831-bbd53e09408d', 'syed fahad', 'stfufahad'],
  post5: ['1512400930990-e0bc0bd809df', 'Timothy Rose', 'timothywilliamrose'],
  post6: ['1680292783974-a9a336c10366', 'Chris Lynch', 'chris_lynch_']
};
const GOT_ALIAS = {
  'drop-ed': 'drop',
  'pk-box': 'box',
  'pk-tag': 'tag',
  'pk-qr': 'qr'
};
const GOT_POOL = {
  h1: ['h1', 'h1b', 'hero', 'drop'],
  h2: ['h2', 'h2b', 'story', 'post4'],
  a1: ['a1', 'a1b', 'box', 'qr'],
  a2: ['a2', 'a2b', 'pack', 'tag']
};
window.GOT_PHOTO_KEY = s => {
  if (window.GOT_PHOTOS[s]) return s;
  if (GOT_ALIAS[s]) return GOT_ALIAS[s];
  const pool = GOT_POOL[String(s).slice(0, 2)] || Object.keys(window.GOT_PHOTOS);
  const n = parseInt(String(s).slice(-1), 10);
  let h = 0;
  for (const c of String(s)) h = h * 31 + c.charCodeAt(0) >>> 0;
  return pool[(isNaN(n) ? h : n) % pool.length];
};
window.GOT_IMG = (s, w, h) => 'https://images.unsplash.com/photo-' + window.GOT_PHOTOS[window.GOT_PHOTO_KEY(s)][0] + '?auto=format&fit=crop&crop=entropy&sat=-100&q=70&w=' + w + '&h=' + h;
// spread onto <image-slot> — Unsplash srcs require credit
window.GOT_SLOT = (s, w, h) => {
  const p = window.GOT_PHOTOS[window.GOT_PHOTO_KEY(s)];
  return {
    src: window.GOT_IMG(s, w, h),
    credit: 'Photo by ' + p[1] + ' on Unsplash',
    'credit-href': 'https://unsplash.com/@' + p[2]
  };
};
window.GOT_PRODUCTS = [{
  id: 'h1',
  image: window.GOT_IMG('h1', 800, 1000),
  altImage: window.GOT_IMG('h1b', 800, 1000),
  name: 'Drop 01 Hoodie',
  meta: 'Black',
  price: 1450,
  badge: 'New',
  cat: 'Hoodies',
  colors: [{
    name: 'Black',
    hex: '#0B0B0B'
  }, {
    name: 'Steel',
    hex: '#777777'
  }],
  sizes: [{
    label: 'S'
  }, {
    label: 'M'
  }, {
    label: 'L'
  }, {
    label: 'XL',
    available: false
  }, {
    label: 'XXL'
  }],
  stock: 6
}, {
  id: 'h2',
  image: window.GOT_IMG('h2', 800, 1000),
  altImage: window.GOT_IMG('h2b', 800, 1000),
  name: 'Drop 01 Hoodie',
  meta: 'Steel',
  price: 1450,
  badge: 'New',
  cat: 'Hoodies',
  colors: [{
    name: 'Steel',
    hex: '#777777'
  }, {
    name: 'Black',
    hex: '#0B0B0B'
  }],
  sizes: [{
    label: 'S'
  }, {
    label: 'M'
  }, {
    label: 'L'
  }, {
    label: 'XL'
  }],
  stock: 3
}, {
  id: 'a1',
  image: window.GOT_IMG('a1', 800, 1000),
  altImage: window.GOT_IMG('a1b', 800, 1000),
  name: 'Monogram Keychain',
  meta: 'Antique silver',
  price: 250,
  cat: 'Accessories',
  colors: [{
    name: 'Antique silver',
    hex: '#9C9B97'
  }],
  sizes: [{
    label: 'One size'
  }],
  stock: 10
}, {
  id: 'a2',
  image: window.GOT_IMG('a2', 800, 1000),
  altImage: window.GOT_IMG('a2b', 800, 1000),
  name: 'Circular Tag',
  meta: 'Black / silver ring',
  price: 150,
  cat: 'Accessories',
  soldOut: true,
  colors: [{
    name: 'Black',
    hex: '#0B0B0B'
  }],
  sizes: [{
    label: 'One size',
    available: false
  }],
  stock: 0
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/data.js", error: String((e && e.message) || e) }); }

// ui_kits/storefront/home-content.js
try { (() => {
// Homepage content model — mirrors what WordPress (ACF/options) + WooCommerce would supply.
// RULE: a section renders only when its required content exists. `null` = not yet approved → section hidden.
// Approved copy below is verbatim from GOT_Complete_Brand_Identity.md. Nothing here is invented.
window.GOT_HOME = {
  announcements: [{
    text: 'Cash on delivery across Egypt'
  }, {
    text: 'Drop 01 — Explore the collection',
    key: 'shop'
  }, {
    text: 'Forged to be different'
  }],
  hero: {
    eyebrow: 'Drop 01',
    title: ['Not for', 'everyone'],
    cta: 'Shop Drop 01'
  },
  drop: {
    id: 'Drop 01',
    title: 'Forged to be different',
    status: 'Now live'
  },
  // status from site_mode
  manifesto: ['Forged', 'to be', 'different'],
  manifestoSupport: ['Not for everyone', 'Born to be different', 'More than just a hoodie'],
  spotlightProductId: 'h1',
  // WooCommerce "featured" flag
  packaging: [{
    id: 'pk-box',
    caption: 'Welcome to GØT',
    note: 'Inside lid'
  }, {
    id: 'pk-tag',
    caption: 'More than just a hoodie',
    note: 'Circular tag'
  }, {
    id: 'pk-qr',
    caption: 'Scan to discover more',
    note: 'QR card'
  }],
  craftsmanship: null,
  // needs approved fabric / weight / construction claims
  bestSellers: null,
  // needs real WooCommerce sales data — never faked
  story: {
    facts: [['Est.', '2026'], ['Base', 'Smouha, Alexandria'], ['Category', 'Streetwear'], ['First release', 'Drop 01']]
  },
  social: [{
    label: 'Instagram',
    handle: '@got.official1',
    href: 'https://www.instagram.com/got.official1/'
  }, {
    label: 'TikTok',
    handle: '@got.offical',
    href: 'https://www.tiktok.com/@got.offical'
  }],
  faq: [{
    title: 'How do I pay?',
    content: 'Cash on delivery. You pay in cash when your order arrives.'
  }, {
    title: 'Where do you deliver?',
    content: 'Alexandria, Cairo / Giza and other Egyptian governorates. The fee for your governorate is shown at checkout before you place the order.'
  }, {
    title: 'Will you confirm my order?',
    content: 'Yes. You receive an order confirmation by email, and we contact you to confirm before shipping.'
  }, {
    title: 'Can I exchange an item?',
    content: null
  } // awaiting approved Return & Exchange policy
  ]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/home-content.js", error: String((e && e.message) || e) }); }

// ui_kits/storefront/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever a design needs an image.
 * You control the slot's shape; it sizes to its container by default. When the search_stock_photos tool
 * is available, prefill the slot by default — write the photo's URL into
 * src (with credit/credit-href); the user can still fill or replace it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The sidecar is a SIBLING of the HTML file that uses this component: the
 * read is a document-relative fetch, and the host resolves the bridge's
 * sidecar writes into the previewed file's directory to match (same
 * contract as design_canvas.jsx). Pages in the same directory share one
 * sidecar; keep slot ids distinct across them.
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          Initial framing baseline: cover | contain.   (default 'cover')
 *                cover starts the image filling the frame (overflow cropped);
 *                contain starts it fully visible (letterboxed). Either way the
 *                user can always pan/scale from there — double-click, or the
 *                Edit control, enters reframe mode (drag to move, scroll or
 *                corner-handles to scale; Escape / click-out commits). The
 *                crop persists alongside the image in the sidecar.
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. Prefill it with a real
 *                photo via search_stock_photos when that tool is available
 *                (set credit/credit-href from the result). A user drop
 *                overrides it; clearing the drop reveals src again.
 *   credit       Attribution text shown as a small overlay at the
 *                bottom-left of the filled slot. REQUIRED whenever src
 *                points at any Unsplash host (images.unsplash.com,
 *                plus.unsplash.com, …): an Unsplash src with no credit
 *                renders an error tile INSTEAD of the photo (Unsplash
 *                terms forbid showing their photos unattributed). Use the
 *                exact form 'Photo by {photographer name} on Unsplash' —
 *                the overlay then links the name to credit-href and
 *                'Unsplash' to the Unsplash homepage, and links back to
 *                unsplash.com automatically get the required utm referral
 *                params appended at render time. The credit belongs to
 *                the src image, so it only shows while src is what's
 *                displayed — a user-dropped image hides it.
 *   credit-href  Link for the photographer's name in the credit overlay
 *                (their Unsplash profile URL from the stock-photo search
 *                results). http(s) URLs only — anything else renders the
 *                name as plain text.
 *
 * Sizing: the slot fills its container by default (width/height 100%).
 * Put it in a sized wrapper — absolutely positioned, a grid cell, a fixed
 * frame — and it takes exactly that box. When the parent's height is
 * indefinite (ordinary flow), it falls back to full width at a 3:2 aspect
 * ratio instead of collapsing. In a shrink-to-fit parent (a float,
 * width:max-content, an unsized absolute wrapper), percentages have
 * nothing to resolve against — size the slot or its wrapper explicitly
 * there. For a fixed-size slot, set
 * width/height on the element itself (inline style), which overrides the
 * default. When
 * layering content above a slot (full-bleed layouts), make the overlay
 * click-through — pointer-events: none on scrims/text plates, re-enabled
 * on interactive children — so the slot's hover controls stay reachable.
 * Keep the slot's bottom-left corner visually clear as well: the credit
 * overlay renders there, and a dark fade or text plate covering it hides
 * the attribution Unsplash's terms require — end the fade above that
 * corner, or keep it nearly transparent where the credit sits.
 *
 * Usage:
 *   <div style="position:relative;width:100%;height:100%">      <!-- full-bleed: -->
 *     <image-slot id="bg" shape="rect"></image-slot>            <!-- fills the wrapper -->
 *   </div>
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';

  // Unsplash terms require visible attribution wherever their photos
  // display, and every link back to unsplash.com must carry utm referral
  // params. Two render-time rules enforce that here:
  //  - an Unsplash-src slot with NO credit attribute renders an error
  //    tile INSTEAD of the photo (an uncredited Unsplash photo on screen
  //    is itself the terms violation, so it never renders bare);
  //  - rendered credit links pointing at unsplash.com get the referral
  //    params appended when absent (credit-href values live in page
  //    content that can't be edited after the fact).
  // Keep the utm_source value in sync with UTM_SOURCE in
  // platform/web-agent/unsplash.ts — this file is a project-local
  // artifact and cannot import it (equality is pinned by tests).
  const UNSPLASH_HOMEPAGE_HREF = 'https://unsplash.com/?utm_source=claude_design&utm_medium=referral';
  // Host rule mirrors the hotlink validator that admits Unsplash srcs into
  // pages in the first place (cdn$ in unsplash.ts: apex or any subdomain)
  // — Unsplash+ results serve from plus.unsplash.com, not just images.*,
  // and an admitted-but-uncredited photo must error whatever unsplash
  // host it rides on.
  // Trailing-dot FQDNs (images.unsplash.com.) are the same host to the
  // browser but would miss the regex — strip one dot so the check fails
  // CLOSED (unrecognized-but-real Unsplash srcs must error, not render).
  const isUnsplashHost = u => {
    try {
      return /(^|\.)unsplash\.com$/.test(new URL(u, document.baseURI).hostname.replace(/\.$/, ''));
    } catch {
      return false;
    }
  };
  // Render-time referral normalization for links back to Unsplash:
  // appends utm_source/utm_medium when absent, preserves every existing
  // query param, never overwrites an existing utm_source, and passes
  // non-Unsplash URLs through untouched. Input is an ABSOLUTE validated
  // http(s) URL (the credit render funnel resolves + validates first).
  const withReferral = href => {
    try {
      const u = new URL(href);
      if (!/(^|\.)unsplash\.com$/.test(u.hostname.replace(/\.$/, ''))) {
        return href;
      }
      if (!u.searchParams.has('utm_source')) {
        u.searchParams.set('utm_source', 'claude_design');
      }
      if (!u.searchParams.has('utm_medium')) {
        u.searchParams.set('utm_medium', 'referral');
      }
      return u.toString();
    } catch (e) {
      return href;
    }
  };
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  // Unload-time flush: save()'s serialization defers a mid-RTT re-fire to a
  // .then that never runs in an unloading document, silently dropping a
  // pagehide commit. Post the current slots immediately instead — content
  // is a superset snapshot of any in-flight save's, the write is a
  // whole-file last-writer-wins replace, and postMessage FIFO delivers it
  // to the host after the in-flight one, so a backend-side reorder at
  // worst reproduces the dropped-commit outcome this flush improves on.
  // Guarded on the initial sidecar read: pre-hydration slots can miss
  // other slots' persisted entries, and flushing it would clobber them —
  // that narrow case stays best-effort (the in-memory merge in load()
  // cannot happen in an unloading document anyway).
  function flushNow() {
    if (!loaded) return;
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    try {
      Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {});
    } catch (e) {}
  }
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet =
  // Fill the container by default: slots are usually placed inside a
  // sized wrapper (a hero frame, a grid cell, an inset:0 layer) and are
  // expected to take that box — a fixed intrinsic size would render as
  // a small tile in the corner of a full-bleed wrapper instead.
  // aspect-ratio is the companion fallback that keeps a bare slot
  // visible when the parent's height is indefinite: height:100%
  // resolves to auto there, and the ratio then derives height from
  // width instead of letting the slot collapse to zero height.
  // Explicit width/height on the element override all of this.
  // color:inherit (not a fixed near-black): the placeholder chrome —
  // empty-state icon/caption (currentColor) and the dashed ring — must
  // read on dark decks too, and the slide's own text color is the one
  // color guaranteed to contrast with the slide background. The soft
  // look comes from opacity on those parts, not from a baked-in alpha.
  ':host{display:block;position:relative;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;' + '  width:100%;height:100%;aspect-ratio:3/2}' + '.empty .cap,.empty .sub{opacity:.75}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(127,127,127,.08)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  // popover=manual promotes the spill to the top layer on reframe, so it is
  // not clipped by any overflow:hidden / clip-path / scroll-container
  // ancestor (a plain z-index can't escape overflow clipping). UA popover
  // defaults (inset:0;margin:auto) are reset; _applyView sets viewport px.
  '.spill{position:fixed;margin:0;inset:auto;border:0;padding:0;background:transparent;' + '  overflow:visible;transform:translate(-50%,-50%);z-index:1;cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px}' + '.empty:hover .sub{opacity:1}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed currentColor;' + '  opacity:.35;transition:border-color .12s,opacity .12s}' + ':host([data-over]) .ring{border-color:#c96442;opacity:1}' + ':host([data-filled]) .ring{display:none}' +
  // Controls overlay INSIDE the frame, pinned to the top-right corner, so
  // a full-bleed slot in an overflow:hidden container still shows them
  // (the old below-mask placement got clipped). Credit sits bottom-left,
  // so top-right avoids collision. The blurred pill background keeps them
  // legible over the image.
  // The UA [popover] base rule styles the element in EVERY state (only
  // display:none is gated on :not(:popover-open), and the display:flex
  // below overrides that) — so the UA resets live HERE, like .spill's,
  // or the ordinary hover-state strip renders as a bordered Canvas box
  // centered by margin:auto. inset:auto precedes top/right (shorthand).
  '.ctl{position:absolute;inset:auto;top:8px;right:8px;margin:0;border:0;padding:0;' + '  background:transparent;overflow:visible;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' +
  // While reframing, the spill owns the top layer and would swallow every
  // click on the in-frame controls. Promoting .ctl into the top layer
  // ABOVE the spill (shown after it — later popovers stack higher) keeps
  // Edit-as-toggle and Replace clickable mid-reframe. _applyView pins it
  // to the frame's top-right in viewport px (translateX(-100%)
  // right-aligns against the computed left edge); inset:auto clears the
  // base rule's top/right so the inline left/top position it alone.
  '.ctl:popover-open{position:fixed;inset:auto;transform:translateX(-100%)}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}' +
  // Replacement in flight: after a src swap the browser keeps painting
  // the PREVIOUS image until the new one decodes, so a Replace would
  // flash the old photo and then pop. Hide the stale frame (visibility,
  // not display — _applyView geometry still applies) and spin until the
  // new image reports in (load/error clears data-swapping).
  ':host([data-swapping]) .frame img{visibility:hidden}' + '.loading{position:absolute;inset:0;display:none;align-items:center;' + '  justify-content:center;pointer-events:none}' + ':host([data-swapping]) .loading{display:flex}' + '.loading::after{content:"";width:22px;height:22px;border-radius:50%;' + '  border:2px solid rgba(127,127,127,.25);border-top-color:currentColor;' + '  animation:om-slot-spin .7s linear infinite}' + '@keyframes om-slot-spin{to{transform:rotate(360deg)}}' +
  // Reduced motion: the static two-tone ring still reads as "working".
  '@media (prefers-reduced-motion:reduce){.loading::after{animation:none}}' + '.credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);display:none;' + '  padding:3px 7px;border-radius:5px;background:rgba(0,0,0,.55);color:#fff;' + '  font:10px/1.2 system-ui,-apple-system,sans-serif;text-decoration:none;' + '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;backdrop-filter:blur(6px)}' +
  // The credit is a SPAN holding one or two <a>s (Unsplash's prescribed
  // form links the photographer AND Unsplash) — anchors style inline so
  // the overlay reads as one line of text.
  '.credit a{color:inherit;text-decoration:none}' + '.credit a:hover,.credit a:focus-visible{text-decoration:underline}' + ':host([data-filled][data-credit]) .credit{display:block}' +
  // Exports must ship JUST the image — no hover controls, no credit chip
  // (the host marks <html data-om-exporting> for the capture window; the
  // page-level hide script can't reach shadow DOM, this rule can).
  ':host-context([data-om-exporting]) .ctl,' + ':host-context([data-om-exporting]) .credit{display:none !important}' +
  // Print must ship just the image too: the hover-gated controls can be
  // mid-hover when print() fires, and the credit chip is screen chrome —
  // the same rule the capture window gets, keyed on print media instead
  // of the host's data-om-exporting mark (the print path sets no mark).
  '@media print{.ctl,.credit{display:none !important}}' +
  // No export-window mask rules here on purpose: the export capture
  // releases the replacement mask by REMOVING data-swapping (the
  // shadow-root pass in pages/export/shared.ts HIDE_EXPORT_CHROME_SCRIPT)
  // — attribute removal works in every engine (:host-context is
  // Chromium-only), is scoped by construction to slots actually
  // mid-swap, and hides the spinner through the same gate. A masked img
  // would otherwise be silently dropped from PPTX decks (the capture
  // walk skips visibility:hidden imgs).
  // Attribution error tile: REPLACES the photo when an Unsplash src has
  // no credit attribute — rendering the photo uncredited is the terms
  // violation, so the photo must not appear at all.
  // Calm and neutral on purpose (review feedback): the tile informs the
  // user; the fix instructions are machine-facing (usage docblock, tool
  // description, and the turn-end scan's bounce copy name the attributes
  // for the agent).
  '.attr-error{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  background:#f2f1ef;color:#6e6c66;user-select:none;' + '  font:13px/1.45 system-ui,-apple-system,sans-serif}' + '.attr-error svg{opacity:.55}' + '.attr-error .cap{max-width:92%;font-weight:500;letter-spacing:.01em}' + ':host([data-attribution-error]) .attr-error{display:flex}' + ':host([data-attribution-error]) .ring{display:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  const warnIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>' + '<path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'placeholder', 'src', 'id', 'credit', 'credit-href'];
    }

    /** Duplicate-slide hook (called by deck-stage, see its
     *  _remintDuplicateIds): copy this id's stored image, if any, under a
     *  freshly minted key and return that key — so a duplicated slide's
     *  slot keeps its dropped photo instead of reverting to the
     *  placeholder. 'isFree' is the caller's uniqueness check (document
     *  ids); candidates must ALSO be unused in the sidecar, which can
     *  hold keys from other pages sharing the project root. (An EMPTY
     *  slot on another page leaves no sidecar entry, so its id is not
     *  detectable here — a minted key can collide with it and that slot
     *  would show this photo. Same blast radius as two pages reusing an
     *  id by hand, which the shared sidecar already permits.) Returns null
     *  when no id could be minted (caller strips the id, today's
     *  behavior). */
    static cloneSlot(fromId, isFree) {
      if (typeof fromId !== 'string' || !fromId) return null;
      // Pre-hydration the store can't veto candidates or source the copy
      // — degrade to the strip (today's behavior) rather than mint
      // against keys we can't see yet. Any rendered (= droppable) slot
      // means load() has already settled.
      if (!loaded) return null;
      const stem = fromId.replace(/-\d+$/, '') || fromId;
      for (let n = 2; n < 100; n++) {
        const toId = stem + '-' + n;
        if (toId === fromId) continue;
        if (slots[toId] !== undefined) {
          // Reuse a key holding this exact value (bytes AND crop) if no
          // live element here owns it — a duplicate op the host refused
          // after minting leaves such a key behind, and reusing keeps
          // refused retries from accumulating one orphaned copy per
          // attempt. Full equality (not just bytes) so a byte-identical
          // key another PAGE owns with its own crop is stepped past, not
          // adopted or rewritten. (Entries without .u never match.)
          const prev = getSlot(toId);
          const cur = getSlot(fromId);
          if (!(prev && cur && prev.u && prev.u === cur.u && prev.s === cur.s && prev.x === cur.x && prev.y === cur.y && (typeof isFree !== 'function' || isFree(toId)))) continue;
          return toId;
        }
        if (typeof isFree === 'function' && !isFree(toId)) continue;
        const v = getSlot(fromId);
        if (v) setSlot(toId, Object.assign({}, v));
        return toId;
      }
      return null;
    }
    constructor() {
      super();
      // clonable: rail thumbnails deep-clone slides and carry this shadow
      // along; reuse an already-cloned root so upgrade-after-clone works.
      // (Deliberately NOT serializable — a getHTML consumer would embed
      // multi-MB sidecar data-URLs into serialized page HTML.)
      const root = this.shadowRoot || this.attachShadow({
        mode: 'open',
        clonable: true
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="attr-error" part="attribution-error">' + warnIcon + '    <div class="cap">This photo needs attribution</div></div>' + '  <div class="loading" part="loading"></div>' + '  <div class="ring" part="ring"></div>' + '</div>' +
      // Outside .frame, like .spill/.ctl — the frame's overflow:hidden +
      // border-radius/clip-path would cut the credit off on circle/pill/mask.
      // A SPAN, not an <a>: the prescribed Unsplash credit holds two links
      // (photographer + Unsplash), built per-render in _render().
      '<span class="credit" part="credit"></span>' + '<div class="spill" popover="manual" data-dc-edit-transparent>' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' +
      // data-dc-edit-transparent: the DC editor's edit-mode picker lets
      // clicks through for chrome marked with it (EDIT_TRANSPARENT_SEL)
      // — without it, Replace/Edit clicks in Edit mode are swallowed by
      // element selection and the controls look dead.
      '<div class="ctl" popover="manual" data-dc-edit-transparent><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="edit" title="Reframe image">Edit</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ctl = root.querySelector('.ctl');
      this._credit = root.querySelector('.credit');
      this._attrError = root.querySelector('.attr-error');
      // Credit clicks open the link, not browse/reframe.
      this._credit.addEventListener('click', e => e.stopPropagation());
      this._credit.addEventListener('dblclick', e => e.stopPropagation());
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      // Encode-in-flight marker (the owning _ingest generation): while set,
      // the same-src "nothing in flight" clear in _render must not fire —
      // the stored value still points at the OLD image until the encode
      // lands, so that clear would unmask the stale image mid-replace.
      this._swapGen = 0;
      // Render-owned swap in flight: set when _render assigns a new src,
      // cleared only by the img's own load/error (or the empty branch).
      // img.complete CANNOT stand in for this — setting src only QUEUES
      // the current-request swap (a microtask), so synchronously after an
      // assignment, complete still reports the OLD settled request. The
      // pick path does exactly that: the host sets src, credit, and
      // credit-href back-to-back in one task, and renders #2/#3 would
      // read the stale complete === true and drop the mask one render
      // after it was set.
      this._loadPending = false;
      // See _render's empty branch: a transient attribution-error wipe of a
      // showing image must make the follow-up render a replacement (spinner),
      // not a first fill (blank frame).
      this._hidShowing = false;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        // The hidden controls are opacity-0 but still tabbable — without
        // this gate a keyboard user could drive them on a read-only share
        // link (mirrors the dblclick handler's editable gate).
        if (!this.hasAttribute('data-editable')) return;
        if (act === 'replace') {
          this._exitReframe(true);
          // Host-owned picker (Unsplash modal; it also offers local import).
          this.dispatchEvent(new CustomEvent('image-slot:pick', {
            bubbles: true,
            composed: true,
            detail: {
              id: this.id || null
            }
          }));
        }
        if (act === 'edit') {
          if (!this._reframes()) return;
          if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      // load/error also release the replacement-in-flight mask (via the
      // single discipline in _releaseMask): the swap is only revealed once
      // the new image can actually paint (on error the frame shows its
      // background, same as a fresh slot with a broken src).
      this._img.addEventListener('load', () => {
        this._loadPending = false;
        this._releaseMask(true);
        this._applyView();
      });
      this._img.addEventListener('error', () => {
        this._loadPending = false;
        this._releaseMask(true);
      });
      // Gated only on editable — any filled slot can be repositioned/scaled,
      // regardless of fit. Share links (no writeFile) stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
          const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // The host may inject window.omelette.writeFile AFTER the first render;
      // re-render on hover so the editable-gated controls reliably appear.
      this.addEventListener('pointerenter', this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('pointerenter', this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      // commit=false: a disconnect is not a user intent — committing here
      // would persist whatever half-finished drag a React remount or DOM
      // splice happened to interrupt. Deliberate exits commit on their own
      // paths (Escape/click-out/toggle), and unloads commit via pagehide.
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._signalReframe(true);
      // Best-effort commit when the document unloads mid-reframe (a host
      // navigation racing the enter signal, a manual reload, tab close):
      // the sidecar write rides the host bridge, which outlives this
      // document, so the crop survives even though the mode dies with the
      // DOM. Held on the instance so _exitReframe detaches exactly what
      // was attached.
      this._pagehide = () => {
        this._exitReframe(true);
        flushNow();
      };
      window.addEventListener('pagehide', this._pagehide);
      // Promote spill to the top layer, then keep it pinned over the frame:
      // scroll/resize cover the common cases, and a per-frame rect check
      // catches layout shifts that fire neither (an image above finishing
      // load, streamed DOM pushing the slot down, an ancestor transform
      // change) so the overlay can't detach from the frame.
      try {
        this._spill.showPopover();
      } catch {}
      // After the spill, so the controls stack above it in the top layer.
      try {
        this._ctl.showPopover();
      } catch {}
      this._reposition = () => {
        if (this.hasAttribute('data-reframe')) this._applyView();
      };
      window.addEventListener('scroll', this._reposition, true);
      window.addEventListener('resize', this._reposition);
      this._lastRect = '';
      this._watch = () => {
        if (!this.hasAttribute('data-reframe')) return;
        const r = this.getBoundingClientRect();
        const key = r.left + ',' + r.top + ',' + r.width + ',' + r.height;
        if (key !== this._lastRect) {
          this._lastRect = key;
          this._applyView();
        }
        this._watchId = requestAnimationFrame(this._watch);
      };
      this._watchId = requestAnimationFrame(this._watch);
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (this._reposition) {
        window.removeEventListener('scroll', this._reposition, true);
        window.removeEventListener('resize', this._reposition);
        this._reposition = null;
      }
      if (this._watchId) {
        cancelAnimationFrame(this._watchId);
        this._watchId = 0;
      }
      if (this._pagehide) {
        window.removeEventListener('pagehide', this._pagehide);
        this._pagehide = null;
      }
      try {
        this._spill.hidePopover();
      } catch {}
      try {
        this._ctl.hidePopover();
      } catch {}
      this._ctl.style.left = '';
      this._ctl.style.top = '';
      if (commit) this._commitView();
      this._signalReframe(false);
    }

    // Reframe state lives only in this DOM until commit, invisible to the
    // host's dirty signals — announce enter/exit so the host can hold
    // auto-reloads for exactly the gesture (the guest bundle forwards
    // image-slot:reframe to the host as imageSlotReframe). Dispatched on
    // the element (composed, so it escapes shadow roots) while connected;
    // a disconnected exit (disconnectedCallback) falls back to document so
    // the host still hears it.
    _signalReframe(active) {
      const target = this.isConnected ? this : document;
      target.dispatchEvent(new CustomEvent('image-slot:reframe', {
        bubbles: true,
        composed: true,
        detail: {
          active: active,
          id: this.id || null
        }
      }));
    }

    // Public: host's "Import from computer" calls this to run local browse.
    openFilePicker() {
      this._exitReframe(true);
      this._input.click();
    }

    // A src write is a newer intent for this slot's content — the host
    // pick path (setImageSlotImage) or an agent edit — so it must win
    // over any encode still in flight from an earlier drop: left live,
    // that encode lands later, passes _ingest's gen guard, and its
    // setSlot silently overwrites the pick (the stored value shadows
    // src in _render). Bumping _gen kills the encode before its own
    // _swapGen clear runs, so clear the dead claim here too — otherwise
    // _releaseMask (gated on !_swapGen) never fires and the pick's
    // spinner is stranded. src ONLY: the pick sets credit/credit-href
    // in the same task, and clearing _swapGen on those would let the
    // same-src branch unmask the old image mid-encode.
    attributeChangedCallback(name, oldVal, newVal) {
      if (name === 'src' && oldVal !== newVal) {
        this._gen++;
        this._swapGen = 0;
      }
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      // Replacing a shown image: surface the swap through the encode too,
      // not just the decode — otherwise the old photo sits there with no
      // feedback while the canvas re-encode runs. An empty slot keeps its
      // placeholder (no spinner) until the encode lands, as before.
      // _swapGen guards the mask against re-renders DURING the encode
      // (pointerenter, ResizeObserver, another slot's store write): the
      // stored value still resolves to the old image there, so _render's
      // same-src clear would otherwise unmask it mid-replace.
      if (this.hasAttribute('data-filled')) {
        this.setAttribute('data-swapping', '');
        this._swapGen = gen;
      }
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        // Clear BEFORE setSlot: its synchronous re-render must see no
        // pending encode, so a byte-identical re-upload (same data URL, no
        // load event coming) still clears the mask via the complete branch.
        this._swapGen = 0;
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._swapGen = 0;
        // Reveal the kept old image — unless another replacement (a
        // remote pick's src swap) is still in flight, in which case the
        // mask stays until THAT image settles (its load/error releases).
        this._releaseMask();
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is available on any filled slot — the user can
    // always reposition/scale. `fit` only sets the initial baseline (see
    // _geom): contain starts fully-visible, cover starts frame-filling.
    _reframes() {
      return this.hasAttribute('data-filled');
    }

    // The single release discipline for the replacement-in-flight mask
    // (data-swapping). The mask comes off only when BOTH hold:
    //  - no encode is pending (_swapGen) — mid-encode the stored value
    //    still resolves to the old image, so any reveal paints it;
    //  - the frame img has settled on its current src — an unsettled src
    //    means some replacement is still in flight (e.g. a remote pick),
    //    whoever started it, and revealing would paint the previous
    //    frame. The load/error listeners pass settled=true (the event IS
    //    the settlement signal, per spec complete is true by then);
    //    other callers rely on the complete flag (covers loaded AND
    //    failed).
    // Every release path funnels through here EXCEPT _render's empty
    // branch (the img is being cleared — nothing will ever settle).
    _releaseMask(settled) {
      if (!this._swapGen && !this._loadPending && (settled || this._img.complete)) {
        this.removeAttribute('data-swapping');
      }
    }

    // Baseline geometry, shared by clamp/apply/resize. `base` is the scale at
    // view-scale s=1: cover = fill the frame (overflow on the looser axis),
    // contain = fit fully inside (letterboxed). Zooming a contain image past
    // s where it overflows naturally becomes a crop. Null until the img has
    // loaded (naturalWidth is 0 before that) or when the slot has no layout
    // box — ResizeObserver fires with a 0×0 rect under display:none, and
    // clamping against a degenerate 1×1 frame would silently pull the stored
    // pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
      const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
      return {
        iw,
        ih,
        fw,
        fh,
        base
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      // Top-layer controls: pin to the frame's top-right in viewport px
      // (the same 8px inset as the in-frame layout; unscaled — top-layer UI
      // reads as chrome, not page content). BEFORE the geometry branch:
      // placement needs only the frame rect, and a not-yet-loaded or broken
      // src must not leave the promoted strip floating unpositioned. Gated
      // on the popover actually being open: without the Popover API,
      // showPopover() threw (swallowed in _enterReframe), .ctl stays in
      // its in-frame absolute layout, and viewport-px coordinates would
      // shove it off-frame — and matches(':popover-open') itself throws
      // there (unknown pseudo-class), hence the try/catch.
      if (this.hasAttribute('data-reframe')) {
        let onTop = false;
        try {
          onTop = this._ctl.matches(':popover-open');
        } catch {}
        if (onTop) {
          const r = this.getBoundingClientRect();
          this._ctl.style.left = r.right - 8 + 'px';
          this._ctl.style.top = r.top + 8 + 'px';
        }
      }
      if (!g) {
        // Dimensions not known yet (before img load) — centered fit so there
        // is no flash of an unpositioned image before the geometry lands.
        const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = contain ? 'contain' : 'cover';
        return;
      }
      // Baseline (cover-fill or contain-fit) × view scale. Width/height and
      // left/top are all frame-% — depends only on the frame aspect ratio, so
      // a responsive resize keeps the same crop. The spill layer mirrors the
      // same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      if (this.hasAttribute('data-reframe')) {
        // Top-layer spill: position in viewport px over the frame. The top
        // layer escapes ancestor transforms entirely, so EVERY term must be
        // in viewport units: getBoundingClientRect gives the frame's scaled
        // origin AND size, and the rect/layout ratio rescales the ghost —
        // sizing from layout px alone renders it 1/scale too large under a
        // scaled deck slide. Inner ghost + handles stay box-relative.
        const r = this.getBoundingClientRect();
        const sx = g.fw ? r.width / g.fw : 1;
        const sy = g.fh ? r.height / g.fh : 1;
        this._spill.style.width = g.iw * k * sx + 'px';
        this._spill.style.height = g.ih * k * sy + 'px';
        this._spill.style.left = r.left + (50 + this._view.x) / 100 * r.width + 'px';
        this._spill.style.top = r.top + (50 + this._view.y) / 100 * r.height + 'px';
      }
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      // An Unsplash src with no credit attribute must NOT render — showing
      // the photo uncredited is the Unsplash-terms violation itself. The
      // error tile replaces the photo until the credit is written. A
      // user-dropped image is the user's own content and always renders.
      // Trimmed: credit is agent/user-editable content, and a whitespace-
      // only value must count as missing — otherwise it would suppress the
      // error tile AND render an empty credit box (no text, no links),
      // exactly the unattributed state this gate exists to prevent.
      const credit = (this.getAttribute('credit') || '').trim();
      const attrError = !!(!credit && !this._userUrl && srcAttr && isUnsplashHost(srcAttr));
      this.toggleAttribute('data-attribution-error', attrError);
      if (url && !attrError) {
        const prev = this._img.getAttribute('src');
        if (prev !== url) {
          // Replacing an already-shown image: mark the swap BEFORE setting
          // src so the stale frame is never revealed (see the data-swapping
          // stylesheet rules). First fill (prev empty) keeps the existing
          // placeholder-until-load behavior — no spinner. _hidShowing
          // covers the pick path's transient attribution-error wipe: prev
          // is gone, but an image WAS showing, so this is a replacement.
          if (prev || this._hidShowing) this.setAttribute('data-swapping', '');
          // Mark the swap BEFORE assigning src: complete keeps reporting
          // the old settled request until the browser's
          // update-the-image-data microtask runs, so same-task re-renders
          // (the pick path's credit/credit-href setAttributes) need this
          // flag, not complete, to know a load is in flight.
          this._loadPending = true;
          this._img.src = url;
          this._ghost.src = url;
        } else {
          // Same-src re-render — release if settled, so an ingest-set
          // spinner can't stick after a byte-identical re-upload (same
          // data URL, no further load event ever fires).
          this._releaseMask();
        }
        this._hidShowing = false;
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this.removeAttribute('data-swapping');
        // The src is being removed — no load/error will ever fire for it.
        this._loadPending = false;
        // A transient attribution-error wipe of a showing image happens on
        // the pick path: the host sets src one setAttribute before credit,
        // so render N hides the old image (attrError) and render N+1
        // restores a URL. Remember the wipe so that restore renders as a
        // replacement (spinner), not a first fill (blank frame).
        this._hidShowing = attrError && !!this._img.getAttribute('src');
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        // The error tile owns the blocked-photo state; .empty stays for
        // the genuinely-empty slot.
        this._empty.style.display = attrError ? 'none' : 'flex';
        this.removeAttribute('data-filled');
      }

      // Credit belongs to the author src, so a user drop hides it.
      // textContent + the http(s)-only funnel keep external strings inert.
      const showCredit = !!(url && credit && !this._userUrl && !attrError);
      this._credit.textContent = '';
      if (showCredit) {
        // Validate once (resolved against the document, http(s) only),
        // then append the terms-required utm referral params to links
        // that point back at unsplash.com.
        let href = '';
        const rawHref = this.getAttribute('credit-href') || '';
        if (rawHref) {
          try {
            const u = new URL(rawHref, document.baseURI);
            if (u.protocol === 'http:' || u.protocol === 'https:') {
              href = withReferral(u.href);
            }
          } catch {}
        }
        const mkLink = (text, linkHref) => {
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.setAttribute('href', linkHref);
          a.textContent = text;
          return a;
        };
        // Unsplash's prescribed credit is TWO links — the photographer's
        // name to their profile (credit-href) and 'Unsplash' to the
        // homepage. Render that split whenever the text has the canonical
        // shape; other text keeps the legacy single-link rendering.
        const m = /^Photo by (.+) on Unsplash$/.exec(credit);
        if (m) {
          this._credit.appendChild(document.createTextNode('Photo by '));
          this._credit.appendChild(href ? mkLink(m[1], href) : document.createTextNode(m[1]));
          this._credit.appendChild(document.createTextNode(' on '));
          this._credit.appendChild(mkLink('Unsplash', UNSPLASH_HOMEPAGE_HREF));
        } else if (href) {
          this._credit.appendChild(mkLink(credit, href));
        } else {
          this._credit.textContent = credit;
        }
      }
      this.toggleAttribute('data-credit', showCredit);
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/image-slot.js", error: String((e && e.message) || e) }); }

__ds_ns.CartDrawer = __ds_scope.CartDrawer;

__ds_ns.CartLine = __ds_scope.CartLine;

__ds_ns.OrderSummary = __ds_scope.OrderSummary;

__ds_ns.Price = __ds_scope.Price;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.ICON_NAMES = __ds_scope.ICON_NAMES;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.Notice = __ds_scope.Notice;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.ColorSelector = __ds_scope.ColorSelector;

__ds_ns.EarlyAccessForm = __ds_scope.EarlyAccessForm;

__ds_ns.QuantityStepper = __ds_scope.QuantityStepper;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.SizeSelector = __ds_scope.SizeSelector;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.AnnouncementBar = __ds_scope.AnnouncementBar;

__ds_ns.FilterBar = __ds_scope.FilterBar;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Header = __ds_scope.Header;

__ds_ns.ThemeToggle = __ds_scope.ThemeToggle;

})();
