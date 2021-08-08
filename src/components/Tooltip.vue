<template>
    <div class="relative group inline-flex justify-center">
        <slot></slot>

        <div
            v-if="message"
            class="
                absolute
                -bottom-3
                flex-col
                items-center
                flex
                mb-6
                opacity-0
                transition-all
                duration-200
                ease-in-out
                group-hover:opacity-100 group-hover:bottom-0
                pointer-events-none
            "
        >
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
                    rounded-md
                "
                v-html="message"
            ></span>
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
            required: false,
        },
    },
})
</script>
