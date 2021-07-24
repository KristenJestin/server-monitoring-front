<template>
    <input
        :id="id"
        :name="'form.' + name"
        type="text"
        class="
            flex-1
            appearance-none
            w-full
            bg-white
            text-gray-700
            placeholder-gray-400
            border
            rounded-lg
            shadow-md
            px-4
            py-2
            text-left text-base
            focus:outline-none focus:ring-2 focus:ring-primary-500
            sm:text-sm
        "
        :class="errors ? 'ring-2 ring-red-500' : ''"
        ref="inputRef"
        :value="formattedValue || undefined"
    />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import useCurrencyInput from 'vue-currency-input'

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
        modelValue: Number,
        type: {
            type: String,
            default: 'text',
        },
        errors: {
            type: Array as PropType<string[]>,
            required: false,
        },
    },
    setup({ name }) {
        const { formattedValue, inputRef } = useCurrencyInput({ currency: 'EUR' })

        return {
            id: 'form-' + name,
            formattedValue,
            inputRef,
        }
    },
})
</script>
