<template>
    <div class="mb-10 flex justify-end">
        <Link href="/states/create" class="btn btn-primary">Create</Link>
    </div>
    <div>
        <Link v-for="state in states" :href="`/states/` + state.slug" class="block m-5">
            <Tag
                :name="state.name"
                :background-color="state.color"
                :border-color="state.border_color"
                :text-color="state.text_color"
            />
        </Link>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

import State from '@/models/State'
import Tag from '@/components/Tag.vue'

export default defineComponent({
    props: {
        states: {
            type: Object as PropType<State[]>,
            required: true,
        },
    },
    components: { Link, Tag },
})
</script>
