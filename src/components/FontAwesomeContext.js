import { defineComponent, provide, inject, readonly, ref, computed, h, createCommentVNode, watchEffect } from 'vue'

import { icon as faIcon, library } from '@fortawesome/fontawesome-svg-core'

import { contextInjectionKey } from './FontAwesomeContextKeys'

import { iconLookupEquals, normalizeIconArgs } from '../utils'
import convert from '../converter'

export const FontAwesomeSymbols = defineComponent({
  name: 'FontAwesomeSymbols',

  props: {
    icons: {
      type: Array,
      required: true
    }
  },

  setup(props) {
    watchEffect(() => library.add(...props.icons))

    const renderedIcons = computed(() => props.icons.map(icon => faIcon(icon, { symbol: true })))

    // TODO: Ideally, fontawesome-svg-core should have a way of rendering specific nodes only.
    const symbols = computed(() => renderedIcons.value
      .map(icon => {
        const symbol = icon.abstract[0].children[0]
        // When rendering symbols:
        // - classes are meaningless
        // - aria-hidden and focusable can be shared through the parent
        const { class: _aClass, 'aria-hidden': _aAriaHidden, focusable: _aFocusable, ...attrs } = symbol.attributes
        return ({ ...symbol, attributes: attrs })
      })
    )

    const vnode = computed(() => h(
      'svg',
      { style: { display: 'none' }, 'aria-hidden': 'true', focusable: 'false' },
      symbols.value.map(s => convert(s))
    ))
    return () => vnode.value
  }
})

export default defineComponent({
  name: 'FontAwesomeContext',

  props: {
    symbols: {
      type: Array,
      required: true
    }
  },

  setup(props, { slots }) {
    const parentContext = inject(contextInjectionKey, ref([]));
    const localContext = computed(() => props.symbols
      .map(normalizeIconArgs)
      .filter(icon => !!icon && !parentContext.value.find(parentIcon => iconLookupEquals(icon, parentIcon)))
    );
    const composedContext = computed(() => parentContext.value.concat(localContext.value))

    provide(contextInjectionKey, readonly(composedContext))

    return () => [
      h(FontAwesomeSymbols, { icons: localContext.value }),
      slots.default ? slots.default() : createCommentVNode('FontAwesomeContext:unused')
    ]
  }
})
