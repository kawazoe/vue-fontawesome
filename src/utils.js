import { parse as faParse } from '@fortawesome/fontawesome-svg-core';
export function normalizeIconArgs (icon) {
  if (icon && typeof icon === 'object' && icon.prefix && icon.iconName && icon.icon) {
    return icon
  }

  if (faParse.icon) {
    return faParse.icon(icon)
  }

  if (icon === null) {
    return null
  }

  if (typeof icon === 'object' && icon.prefix && icon.iconName) {
    return icon
  }

  if (Array.isArray(icon) && icon.length === 2) {
    return { prefix: icon[0], iconName: icon[1] }
  }

  if (typeof icon === 'string') {
    return { prefix: 'fas', iconName: icon }
  }
}

export function iconLookupEquals(left, right) {
  return left === right
    || left == null && right == null
    || (left.prefix === right.prefix && left.iconName === right.iconName);
}

export function objectWithKey (key, value) {
  return ((Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value)) ? {[key]: value} : {}
}

export function classList (props) {
  let classes = {
    'fa-spin': props.spin,
    'fa-pulse': props.pulse,
    'fa-fw': props.fixedWidth,
    'fa-border': props.border,
    'fa-li': props.listItem,
    'fa-inverse': props.inverse,
    'fa-flip': props.flip === true,
    'fa-flip-horizontal': props.flip === 'horizontal' || props.flip === 'both',
    'fa-flip-vertical': props.flip === 'vertical' || props.flip === 'both',
    [`fa-${props.size}`]: props.size !== null,
    [`fa-rotate-${props.rotation}`]: props.rotation !== null,
    [`fa-pull-${props.pull}`]: props.pull !== null,
    'fa-swap-opacity': props.swapOpacity,
    'fa-bounce': props.bounce,
    'fa-shake': props.shake,
    'fa-beat': props.beat,
    'fa-fade': props.fade,
    'fa-beat-fade': props.beatFade,
    'fa-flash': props.flash,
    'fa-spin-pulse': props.spinPulse,
    'fa-spin-reverse': props.spinReverse
  }

  return Object.keys(classes)
    .map(key => classes[key] ? key : null)
    .filter(key => key)
}

export function addStaticClass(to, what) {
  const val = (to || '').length === 0 ? [] : [to]

  return val.concat(what).join(' ')
}
