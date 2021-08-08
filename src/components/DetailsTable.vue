<template>
    <div
        class="details-table-element px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        :class="{
            'bg-gray-100 transition duration-500 ease-in-out dark:bg-gray-700': odd,
        }"
    >
        <dt
            class="
                text-sm
                font-medium
                text-gray-500
                transition
                duration-500
                ease-in-out
                dark:text-gray-300
            "
        >
            {{ name }}
        </dt>
        <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2">
            <slot>
                <i class="italic text-gray-400">null</i>
            </slot>
        </dd>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
        odd: {
            type: Boolean,
            default: false,
        },
    },
})
</script>

<style>
.details-table-element:nth-child(odd) {
    @apply bg-gray-100 transition duration-500 ease-in-out dark:bg-gray-700;
}
</style>
