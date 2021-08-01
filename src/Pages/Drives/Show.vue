<template>
    <div class="mb-10 flex justify-end">
        <button class="btn btn-danger mr-4" @click="deleteButtonPress">Delete</button>
        <Link :href="$routes.get('drives.edit', { id: drive.slug })" class="btn btn-muted"
            >Edit</Link
        >
    </div>
    <div>
        <div>
            {{ drive.name }}
        </div>
    </div>
    <Modal
        v-model:open="modalOpen"
        :action="destroy"
        title="Delete Drive"
        :message="`Are you sure you want to delete the drive '${drive.name}' ? All of your data will be permanently removed. This action cannot be undone.`"
        button="Delete"
    />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, inject } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import { RoutesModule } from '@/plugins/routes/props'
import DriveModel from '@/models/Drive'
import Modal from '@/components/Modal.vue'

export default defineComponent({
    props: {
        drive: {
            type: Object as PropType<DriveModel>,
            required: true,
        },
    },
    components: { Link, Modal },
    setup({ drive }) {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const modalOpen = ref(false)

        // methods
        const deleteButtonPress = () => {
            modalOpen.value = true
        }
        const destroy = () => {
            Inertia.delete($routes?.get('drives.destroy', { id: drive.slug }) || '')
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
