<template>
    <span v-if="errors" class="font-light text-sm text-red-600">{{ errors[0] }}</span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        errors: {
            type: Array as PropType<string[]>,
            required: false,
        },
    },
})
</script>
