<template>
    <div class="mb-10 flex justify-end">
        <Link href="/folders/create" class="btn btn-primary">Create</Link>
    </div>
    <div v-if="[...folders, ...documents].length">
        <div v-for="folder in folders" class="block m-5">
            <Link class="flex" :href="$routes.get('folders.show', { id: folder.slug })">
                <FolderIcon class="h-6 w-6" />
                <span class="ml-2">{{ folder.name }}</span>
            </Link>
        </div>
        <div v-for="document in documents" class="block m-5">
            <Link :href="$routes.get('documents.show', { id: document.slug })" class="flex">
                <DocumentIcon class="h-6 w-6" />
                <span class="ml-2">{{ document.name }}</span>
            </Link>
        </div>
    </div>
    <div v-else>
        <i class="italic">empty folder ...</i>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'
import {
    FolderIcon,
    FolderOpenIcon,
    DocumentTextIcon as DocumentIcon,
} from '@heroicons/vue/outline'

import FolderModel from '@/models/Folder'
import DocumentModel from '@/models/Document'

export default defineComponent({
    props: {
        folder: {
            type: Object as PropType<FolderModel>,
            required: true,
        },
        folders: {
            type: Object as PropType<FolderModel[]>,
            default: [],
        },
        documents: {
            type: Object as PropType<DocumentModel[]>,
            default: [],
        },
    },
    components: { Link, FolderIcon, FolderOpenIcon, DocumentIcon },
})
</script>
