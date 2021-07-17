<template>
    <div class="mb-10 flex justify-end">
        <button class="btn btn-danger mr-4" @click="deleteButtonPress">Delete</button>
        <Link :href="'/states/' + state.slug + '/edit'" class="btn btn-muted">Edit</Link>
    </div>
    <div>
        <div
            :style="{
                backgroundColor: state.color,
                border: `4px solid ${state.border_color}`,
                color: state.text_color,
                marginBottom: '20px',
            }"
        >
            {{ state.name }}
        </div>
    </div>
    <Modal
        v-model:open="modalOpen"
        :action="destroy"
        title="Delete State"
        :message="`Are you sure you want to delete the state '${state.name}' ? All of your data will be permanently removed. This action cannot be undone.`"
        button="Delete"
    />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/inertia-vue3'

import StateModel from '@/models/State'
import Modal from '@/components/Modal.vue'

export default defineComponent({
    props: {
        state: {
            type: Object as PropType<StateModel>,
            required: true,
        },
    },
    components: { Link, Modal },
    setup({ state }) {
        const modalOpen = ref(false)
        const deleteButtonPress = () => {
            modalOpen.value = true
        }
        const destroy = () => {
            Inertia.delete(`/states/${state.slug}`)
        }

        return {
            destroy,
            deleteButtonPress,
            modalOpen,
        }
    },
})
</script>
