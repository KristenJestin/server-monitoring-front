<template>
    <div class="mb-10 flex justify-end">
        <Link href="/tags/create" class="btn btn-primary">Create</Link>
    </div>
    <div>
        <div v-for="tag in tags" class="block m-5">
            <Link :href="$routes.get('tags.show', { id: tag.slug })">
                <Tag :name="tag.name" :background-color="tag.color" :text-color="tag.text_color" />
            </Link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

import TagModel from '@/models/Tag'
import Tag from '@/components/Tag.vue'

export default defineComponent({
    props: {
        tags: {
            type: Object as PropType<TagModel[]>,
            required: true,
        },
    },
    components: { Link, Tag },
})
</script>
