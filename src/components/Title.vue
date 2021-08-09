<template>
    <h1 class="font-header" :class="[size, { uppercase, 'font-extrabold': bold }]">
        {{ name }}
    </h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            default: 'text-3xl',
        },
        uppercase: {
            type: Boolean,
            default: true,
        },
        bold: {
            type: Boolean,
            default: true,
        },
    },
})
</script>
