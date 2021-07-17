<template>
    <div
        class="
            text-xs
            inline-flex
            items-center
            font-bold
            leading-sm
            uppercase
            px-3
            py-1
            rounded-full
            transition-opacity
            hover:opacity-75
        "
        :style="{ backgroundColor, borderColor, color: textColor }"
    >
        {{ name }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        name: String,
        backgroundColor: String,
        borderColor: String,
        textColor: String,
    },
})
</script>
