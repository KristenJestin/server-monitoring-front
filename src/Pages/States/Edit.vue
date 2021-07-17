<template>
    <div class="mb-2" v-if="errors"><ErrorMessage /></div>

    <div class="mt-10">
        <form @submit.prevent="submit">
            <FormGroup :form="form" name="name" label="Name" :errors="errors?.name" />
            <FormGroup :form="form" name="color" label="Background Color" :errors="errors?.color" />
            <FormGroup
                :form="form"
                name="borderColor"
                label="Border Color"
                :errors="errors?.borderColor"
            />
            <FormGroup
                :form="form"
                name="textColor"
                label="Text Color"
                :errors="errors?.textColor"
            />

            <Link href="/states" class="btn btn-muted mr-5">Cancel</Link>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'
import { Inertia } from '@inertiajs/inertia'

import StateModel from '@/models/State'
import ErrorsModel from '@/models/Error'
import FormGroup from '@/components/FormGroup.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

export default defineComponent({
    props: {
        state: {
            type: Object as PropType<StateModel>,
            required: true,
        },
        errors: {
            type: Object as PropType<ErrorsModel>,
            required: false,
        },
    },
    components: { Link, FormGroup, ErrorMessage },
    setup({ state }) {
        const form = reactive({
            name: state.name,
            color: state.color,
            textColor: state.text_color,
            borderColor: state.border_color,
        })

        const submit = () => {
            console.log(state)
            Inertia.put(`/states/${state.slug}`, form)
        }

        return { form, submit }
    },
})
</script>
