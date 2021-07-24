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
            <div class="mt-1 mb-5 flex">
                <Tag
                    v-for="tag in document.tags"
                    :name="tag.name"
                    :background-color="tag.color"
                    :text-color="tag.text_color"
                />
            </div>
        </div>

        <div class="mt-5">
            <a
                :href="$routes.get('documents.download', { id: document.slug })"
                class="no-underline hover:underline text-blue-600"
                >Lien de téléchargement</a
            >
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
import Modal from '@/components/Modal.vue'
import Tag from '@/components/Tag.vue'
import DocumentModel from '@/models/Document'

export default defineComponent({
    props: {
        document: {
            type: Object as PropType<DocumentModel>,
            required: true,
        },
    },
    components: { Link, Modal, Tag },
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
