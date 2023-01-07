import { parse as faParse, icon as faIcon } from '@fortawesome/fontawesome-svg-core'
import { defineComponent, computed, watch, inject, ref } from 'vue'
import convert from '../converter'
import log from '../logger'
import { normalizeIconArgs, objectWithKey, classList, iconLookupEquals } from '../utils'

import { contextInjectionKey } from './FontAwesomeContextKeys';

export default defineComponent({
  name: 'FontAwesomeIcon',

  props: {
    border: {
      type: Boolean,
      default: false
    },
    fixedWidth: {
      type: Boolean,
      default: false
    },
    flip: {
      type: [Boolean, String],
      default: false,
      validator: (value) => [true, false, 'horizontal', 'vertical', 'both'].indexOf(value) > -1
    },
    icon: {
      type: [Object, Array, String],
      required: true
    },
    mask: {
      type: [Object, Array, String],
      default: null
    },
    listItem: {
      type: Boolean,
      default: false
    },
    pull: {
      type: String,
      default: null,
      validator: (value) => ['right', 'left'].indexOf(value) > -1
    },
    pulse: {
      type: Boolean,
      default: false
    },
    rotation: {
      type: [String, Number],
      default: null,
      validator: (value) => [90, 180, 270].indexOf(Number.parseInt(value, 10)) > -1
    },
    swapOpacity: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: null,
      validator: (value) => ['2xs', 'xs', 'sm', 'lg', 'xl', '2xl', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'].indexOf(value) > -1
    },
    spin: {
      type: Boolean,
      default: false
    },
    transform: {
      type: [String, Object],
      default: null
    },
    title: {
      type: String,
      default: null
    },
    inverse: {
      type: Boolean,
      default: false
    },
    bounce: {
      type: Boolean,
      default: false
    },
    shake: {
      type: Boolean,
      default: false
    },
    beat: {
      type: Boolean,
      default: false
    },
    fade: {
      type: Boolean,
      default: false
    },
    beatFade: {
      type: Boolean,
      default: false
    },
    flash: {
      type: Boolean,
      default: false
    },
    spinPulse: {
      type: Boolean,
      default: false
    },
    spinReverse: {
      type: Boolean,
      default: false
    },
  },

  setup (props, { attrs }) {
    const icon = computed(() => normalizeIconArgs(props.icon))
    const classes = computed(() => objectWithKey('classes', classList(props)))
    const transform = computed(() => objectWithKey(
      'transform',
      (typeof props.transform === 'string')
        ? faParse.transform(props.transform)
        : props.transform
    ))
    const mask = computed(() => objectWithKey('mask', normalizeIconArgs(props.mask)))

    const renderedIcon = computed(() => faIcon(icon.value, {
      ...classes.value,
      ...transform.value,
      ...mask.value,
      symbol: false,
      title: props.title
    }))

    watch(renderedIcon, (value) => {
      if (!value) {
        return log('Could not find one or more icon(s)', icon.value, mask.value)
      }
    }, { immediate: true })

    const context = inject(contextInjectionKey, ref([]))
    const cached = computed(() => context.value.find(i => iconLookupEquals(i, icon.value)))

    const vnode = computed(() => {
      if (!renderedIcon.value) {
        return null;
      }

      let svg = renderedIcon.value.abstract[0];

      // TODO: Ideally, fontawesome-svg-core should have a way of rendering specific nodes only.
      if (cached.value) {
        // When referencing symbols, the content needs to be replaced by a link to the rendered symbol
        const symbolId = `#${icon.value.prefix}-fa-${icon.value.iconName}`
        svg = {
          ...svg,
          children: [{ tag: 'use', attributes: { 'xlink:href': symbolId } }]
        }
      }

      return convert(svg, {}, attrs);
    })
    return () => vnode.value
  }
})
