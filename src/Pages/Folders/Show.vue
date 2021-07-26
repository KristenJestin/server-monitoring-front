<template>
    <div class="mb-10 flex justify-end">
        <button class="btn btn-danger mr-4" @click="deleteButtonPress">Delete</button>
        <Link :href="$routes.get('folders.edit', { id: folder.slug })" class="btn btn-muted"
            >Edit</Link
        >
    </div>
    <div>
        <div
            :style="{
                backgroundColor: folder.color,
                color: folder.text_color,
                marginBottom: '20px',
            }"
        >
            {{ folder.name }}
        </div>
    </div>
    <Modal
        v-model:open="modalOpen"
        :action="destroy"
        title="Delete Folder"
        :message="`Are you sure you want to delete the folder '${folder.name}' ? All of your data will be permanently removed. This action cannot be undone.`"
        button="Delete"
    />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, inject } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import { RoutesModule } from '@/plugins/routes/props'
import FolderModel from '@/models/Folder'
import Modal from '@/components/Modal.vue'

export default defineComponent({
    props: {
        folder: {
            type: Object as PropType<FolderModel>,
            required: true,
        },
    },
    components: { Link, Modal },
    setup({ folder }) {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const modalOpen = ref(false)

        // methods
        const deleteButtonPress = () => {
            modalOpen.value = true
        }
        const destroy = () => {
            Inertia.delete($routes?.get('folders.destroy', { id: folder.slug }) || '')
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
