<template>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
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
