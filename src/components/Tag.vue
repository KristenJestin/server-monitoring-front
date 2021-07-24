<template>
    <div
        class="
            bg-primary-500
            text-white text-sm
            font-semibold
            py-0.5
            px-2
            rounded
            flex
            items-center
            whitespace-nowrap
        "
        :class="extraClass"
        :style="{
            backgroundColor,
            color: textColor,
        }"
    >
        {{ name }}
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        name: { type: String, required: true },
        backgroundColor: String,
        textColor: String,
        extraClass: String,
    },
})
</script>
