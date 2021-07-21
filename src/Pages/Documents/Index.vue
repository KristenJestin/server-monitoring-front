<template>
    <div class="mb-10 flex justify-end">
        <Link href="/documents/create" class="btn btn-primary">Create</Link>
    </div>
    <div>
        <div v-for="document in documents" class="block m-5">
            <Link :href="$routes.get('documents.show', { id: document.slug })">
                {{ document.name }}
            </Link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

import Document from '@/models/Document'

export default defineComponent({
    props: {
        documents: {
            type: Object as PropType<Document[]>,
            required: true,
        },
    },
    components: { Link },
})
</script>
