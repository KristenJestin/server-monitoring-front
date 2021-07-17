<template>
    <div class="mb-10 flex justify-end">
        <button class="btn btn-danger mr-4" @click="deleteButtonPress">Delete</button>
        <Link :href="$routes.get('projects.edit', { id: project.slug })" class="btn btn-muted"
            >Edit</Link
        >
    </div>
    <div>
        <div
            :style="{
                marginBottom: '20px',
            }"
        >
            {{ project.name }}
        </div>
    </div>
    <Modal
        v-model:open="modalOpen"
        :action="destroy"
        title="Delete Project"
        :message="`Are you sure you want to delete the project '${project.name}' ? All of your data will be permanently removed. This action cannot be undone.`"
        button="Delete"
    />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, inject } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import { RoutesModule } from '@/plugins/routes/props'
import ProjectModel from '@/models/Project'
import Modal from '@/components/Modal.vue'

export default defineComponent({
    props: {
        project: {
            type: Object as PropType<ProjectModel>,
            required: true,
        },
    },
    components: { Link, Modal },
    setup({ project }) {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const modalOpen = ref(false)

        // methods
        const deleteButtonPress = () => {
            modalOpen.value = true
        }
        const destroy = () => {
            Inertia.delete($routes?.get('projects.destroy', { id: project.slug }) || '')
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
