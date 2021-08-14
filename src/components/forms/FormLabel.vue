<template>
    <label
        :for="id"
        class="
            block
            text-gray-600
            transition
            duration-500
            ease-in-out
            dark:text-gray-300
            text-sm text-left
            font-bold
        "
    >
        {{ label }}
    </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
    },
    setup({ name }) {
        return {
            id: 'form-' + name,
        }
    },
})
</script>
