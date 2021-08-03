<template>
    <input
        :id="id"
        :name="'form.' + name"
        type="file"
        class="
            flex-1
            appearance-none
            w-full
            bg-white
            text-gray-700
            placeholder-gray-400
            dark:bg-gray-700 dark:text-gray-100 dark:border-gray-800
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
        @input="onInput"
    />
    <!-- v-model="form[name]" -->
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
            type: Object as PropType<File | undefined>,
            required: false,
        },
        errors: {
            type: Array as PropType<string[]>,
            required: false,
        },
    },
    setup({ name }, { emit }) {
        const onInput = (event: any) => {
            const target = event.target
            const files = target.files
            if (files && files.length) emit('update:modelValue', files[0])
        }

        return {
            id: 'form-' + name,
            onInput,
        }
    },
})
</script>
