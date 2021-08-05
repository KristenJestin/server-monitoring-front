<template>
    <textarea
        :id="id"
        :name="'form.' + name"
        class="
            flex-1
            appearance-none
            w-full
            bg-white
            text-gray-700
            placeholder-gray-400
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
            border
            rounded-lg
            shadow-md
            px-4
            py-2
            text-left text-base
            focus:outline-none focus:ring-2 focus:ring-primary-500
            sm:text-sm
            mr-2
        "
        :class="errors ? 'ring-2 ring-red-500' : ''"
        :value="modelValue"
        @input="onInput"
    ></textarea>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
        modelValue: {
            type: [String, undefined] as PropType<string | undefined>,
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
