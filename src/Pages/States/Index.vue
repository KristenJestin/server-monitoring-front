<template>
    <div class="mb-10">
        <Link href="/states/create" class="btn">Create</Link>
    </div>
    <div>
        <div
            v-for="state in states"
            :style="{
                backgroundColor: state.color,
                border: `4px solid ${state.border_color}`,
                color: state.text_color,
                marginBottom: '20px',
            }"
        >
            {{ state.name }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

import State from '@/models/State'

export default defineComponent({
    props: {
        states: {
            type: Object as PropType<State[]>,
            required: true,
        },
    },
    components: { Link },
})
</script>
