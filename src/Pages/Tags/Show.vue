<template>
    <div class="mb-10 flex justify-end">
        <button class="btn btn-danger mr-4" @click="deleteButtonPress">Delete</button>
        <Link :href="$routes.get('tags.edit', { id: tag.slug })" class="btn btn-muted">Edit</Link>
    </div>
    <div>
        <div
            :style="{
                backgroundColor: tag.color,
                color: tag.text_color,
                marginBottom: '20px',
            }"
        >
            {{ tag.name }}
        </div>
    </div>
    <Modal
        v-model:open="modalOpen"
        :action="destroy"
        title="Delete Tag"
        :message="`Are you sure you want to delete the tag '${tag.name}' ? All of your data will be permanently removed. This action cannot be undone.`"
        button="Delete"
    />
</template>

<script lang="ts">
import { defineComponent, PropType, ref, inject } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import { RoutesModule } from '@/plugins/routes/props'
import TagModel from '@/models/Tag'
import Modal from '@/components/Modal.vue'

export default defineComponent({
    props: {
        tag: {
            type: Object as PropType<TagModel>,
            required: true,
        },
    },
    components: { Link, Modal },
    setup({ tag }) {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const modalOpen = ref(false)

        // methods
        const deleteButtonPress = () => {
            modalOpen.value = true
        }
        const destroy = () => {
            Inertia.delete($routes?.get('tags.destroy', { id: tag.slug }) || '')
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
