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
        @input="handleFileInput"
    />
    <!-- v-model="form[name]" -->
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        form: {
            type: Object,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        errors: {
            type: Array as PropType<string[]>,
            required: false,
        },
    },
    setup({ form, name }) {
        const handleFileInput = (event: any) => {
            const target = event.target
            const files = target.files
            if (files && files.length) form[name] = files[0]
        }

        return {
            handleFileInput,
            id: 'form-' + name,
        }
    },
})
</script>
