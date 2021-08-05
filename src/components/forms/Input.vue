<template>
    <input
        :id="id"
        :name="'form.' + name"
        :type="type"
        class="
            flex-1
            appearance-none
            w-full
            bg-white
            text-gray-700
            placeholder-gray-400
            border border-gray-100
            transition
            duration-500
            ease-in-out
            dark:bg-gray-700
            transition
            duration-500
            ease-in-out
            dark:text-gray-100
            transition
            duration-500
            ease-in-out
            dark:border-gray-800
            rounded-lg
            shadow-md
            px-4
            py-2
            text-left text-base
            focus:outline-none focus:ring-2 focus:ring-primary-500
            sm:text-sm
        "
        :class="errors ? 'ring-2 ring-red-500' : ''"
        :value="modelValue"
        @input="onInput"
    />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
        modelValue: {
            type: [String, Number] as PropType<string | number | undefined>,
            required: false,
        },
        type: {
            type: String,
            default: 'text',
        },
        errors: {
            type: Array as PropType<string[]>,
            required: false,
        },
    },
    setup({ name }, { emit }) {
        const onInput = (event: any) => {
            const target = event.target
            const value = target.value
            if (value !== undefined) emit('update:modelValue', value)
        }

        return {
            id: 'form-' + name,
            onInput,
        }
    },
})
</script>
