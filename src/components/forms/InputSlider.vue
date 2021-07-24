<template>
    <Slider
        v-model="value"
        :format="{ suffix: ' Months' }"
        show-tooltip="focus"
        :classes="{
            target: 'relative box-border user-select-none touch-none tap-highlight-transparent touch-callout-none disabled:cursor-not-allowed',
            focused: 'slider-focused',
            tooltipFocus: 'slider-tooltip-focus',
            tooltipDrag: 'slider-tooltip-drag',
            ltr: 'slider-ltr',
            rtl: 'slider-rtl',
            horizontal: 'slider-horizontal h-1.5',
            vertical: 'slider-vertical w-1.5 h-80',
            textDirectionRtl: 'slider-txt-rtl',
            textDirectionLtr: 'slider-txt-ltr',
            base: 'w-full h-full relative z-1 bg-gray-300 rounded',
            connects: 'w-full h-full relative overflow-hidden z-0 rounded',
            connect:
                'absolute z-1 top-0 right-0 transform-origin-0 transform-style-flat h-full w-full bg-primary-500 cursor-pointer tap:duration-300 tap:transition-transform disabled:bg-gray-400 disabled:cursor-not-allowed',
            origin: 'slider-origin absolute z-1 top-0 right-0 transform-origin-0 transform-style-flat h-1/10 w-1/10 h:h-0 txt-rtl-h:left-0 txt-rtl-h:right-auto v:w-0 tap:duration-300 tap:transition-transform',
            handle: 'absolute rounded-full bg-white border-0 shadow-slider cursor-grab focus:outline-none h:w-4 h:h-4 h:-top-1.5 h:-right-2 txt-rtl-h:-left-2 txt-rtl-h:right-auto v:w-4 v:h-4 v:-top-2 v:-right-1.25 disabled:cursor-not-allowed focus:ring focus:ring-primary-500 focus:ring-opacity-30',
            touchArea: 'h-full w-full',
            tooltip:
                'absolute block text-sm font-semibold whitespace-nowrap py-1 px-1.5 min-w-5 text-center text-white rounded border border-primary-500 bg-primary-500 transform h:-translate-x-1/2 h:left-1/2 h:bottom-6 h:arrow-bottom v:-translate-y-1/2 v:top-1/2 v:right-6 v:arrow-right disabled:bg-gray-400 disabled:border-gray-400 merge-h:translate-x-1/2 merge-h:left-auto merge-h:bottom-3.5 merge-v:-translate-x-4 merge-v:top-auto merge-v:right-1 tt-focus:hidden tt-focused:block tt-drag:hidden tt-dragging:block',
            tooltipHidden: 'slider-tooltip-hidden',
            active: 'slider-active shadow-slider-active cursor-grabbing',
            draggable: 'cursor-ew-resize v:cursor-ns-resize',
            tap: 'slider-state-tap',
            drag: 'slider-state-drag',
        }"
    />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import Slider from '@vueform/slider'
import { ChevronDownIcon, XIcon } from '@heroicons/vue/solid'

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
        modelValue: {
            type: Number,
            required: true,
        },
        errors: {
            type: Array as PropType<string[]>,
            required: false,
        },
    },
    components: { Slider, ChevronDownIcon, XIcon },
    setup({ name, modelValue }, { emit }) {
        const value = ref(modelValue)
        watch(value, (v) => {
            emit('update:modelValue', v)
        })

        return {
            id: 'form-' + name,
            value,
        }
    },
})
</script>
