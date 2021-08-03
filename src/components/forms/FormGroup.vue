<template>
    <div :class="{ 'mb-5': margin }">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        margin: {
            type: Boolean,
            default: true,
        },
    },
})
</script>
