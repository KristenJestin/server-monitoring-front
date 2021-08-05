<template>
    <div>
        <div class="mb-4 flex justify-between items-center px-4 sm:px-0">
            <Title v-if="title" :name="title" />
            <slot v-else name="title">Title</slot>
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
            <div
                class="
                    relative
                    bg-gray-50
                    transition
                    duration-500
                    ease-in-out
                    dark:bg-gray-600
                    shadow-lg
                    sm:rounded-3xl
                "
            >
                <div class="px-6 md:px-20 py-6">
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
            required: false,
        },
    },
    components: { Title },
})
</script>
