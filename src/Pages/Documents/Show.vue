<template>
    <div class="mb-10 flex justify-end">
        <button class="btn btn-danger mr-4" @click="deleteButtonPress">Delete</button>
        <Link :href="$routes.get('documents.edit', { id: document.slug })" class="btn btn-muted"
            >Edit</Link
        >
    </div>
    <div>
        <div
            :style="{
                marginBottom: '20px',
            }"
        >
            {{ document.name }}
            <ul>
                <li v-for="tag in document.tags">{{ tag.name }}</li>
            </ul>
        </div>
    </div>
    <Modal
        v-model:open="modalOpen"
        :action="destroy"
        title="Delete Document"
        :message="`Are you sure you want to delete the document '${document.name}' ? All of your data will be permanently removed. This action cannot be undone.`"
        button="Delete"
    />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, inject } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import { RoutesModule } from '@/plugins/routes/props'
import DocumentModel from '@/models/Document'
import Modal from '@/components/Modal.vue'

export default defineComponent({
    props: {
        document: {
            type: Object as PropType<DocumentModel>,
            required: true,
        },
    },
    components: { Link, Modal },
    setup({ document }) {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const modalOpen = ref(false)

        // methods
        const deleteButtonPress = () => {
            modalOpen.value = true
        }
        const destroy = () => {
            Inertia.delete($routes?.get('documents.destroy', { id: document.slug }) || '')
        }

        // return
        return {
            destroy,
            deleteButtonPress,
            modalOpen,
        }
    },
})
</script>
