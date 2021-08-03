<template>
    <div>
        <div class="mb-4 flex justify-between items-center px-4 sm:px-0">
            <Title :name="title" />
            <div>
                <slot name="title-right-part"></slot>
            </div>
        </div>
        <div class="mt-8 relative w-full max-w-full mx-auto">
            <div
                class="
                    absolute
                    inset-0
                    -mr-3.5
                    bg-gradient-to-r
                    from-primary-300
                    to-primary-500
                    shadow-lg
                    transform
                    -skew-y-6
                    sm:skew-y-0 sm:rotate-2 sm:rounded-3xl
                    max-w-full
                "
            ></div>
            <div class="relative bg-white dark:bg-gray-600 shadow-lg sm:rounded-3xl">
                <div class="px-20 py-6">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Title from '@/components/Title.vue'

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    components: { Title },
})
</script>
