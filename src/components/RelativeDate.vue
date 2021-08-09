<template>
    <Tooltip :message="formatedClassic">{{ message || formatedRelative }}</Tooltip>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { DateTime } from 'luxon'

import Tooltip from '@/components/Tooltip.vue'

export default defineComponent({
    props: {
        date: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: false,
        },
    },
    components: { Tooltip },
    setup({ date }) {
        // refs
        const formated = computed(() => DateTime.fromISO(date))
        const formatedRelative = computed(() => formated.value.toRelative())
        const formatedClassic = computed(() => formated.value.toLocaleString(DateTime.DATETIME_MED))

        // return
        return {
            formatedRelative,
            formatedClassic,
        }
    },
})
</script>
