<template>
    <div class="relative flex flex-col items-center group">
        <slot></slot>

        <div class="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
            <span
                class="
                    relative
                    z-10
                    p-2
                    text-xs
                    leading-none
                    text-white
                    whitespace-nowrap
                    bg-gray-900
                    shadow-lg
                "
                v-html="message"
            >
            </span>
            <div class="w-3 h-3 -mt-2 transform rotate-45 bg-gray-900"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        message: {
            type: String,
            required: true,
        },
    },
})
</script>
