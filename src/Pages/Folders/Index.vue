<template>
    <div class="mb-10 flex justify-end">
        <Link href="/folders/create" class="btn btn-primary">Create</Link>
    </div>
    <div>
        <div v-for="folder in folders" class="block m-5">
            <Link :href="$routes.get('folders.show', { id: folder.slug })">
                {{ folder.name }}
            </Link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

import FolderModel from '@/models/Folder'

export default defineComponent({
    props: {
        folders: {
            type: Object as PropType<FolderModel[]>,
            required: true,
        },
    },
    components: { Link },
})
</script>
