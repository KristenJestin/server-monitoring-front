<template>
    <div class="mb-2" v-if="errors"><ErrorMessage /></div>

    <div class="mt-10">
        <form @submit.prevent="submit">
            <FormGroup>
                <FormLabel label="Name" name="name" />
                <Input :form="form" name="name" :errors="errors?.name" />
                <FormError :errors="errors?.name" />
            </FormGroup>
            <FormGroup>
                <FormLabel label="Tags" name="tags" />
                <Dropdown
                    :form="form"
                    name="tags"
                    :errors="errors?.tags"
                    :options="
                        tags.map((tag) => ({
                            label: tag.name,
                            value: tag.name,
                            color: tag.color,
                            textColor: tag.text_color,
                        }))
                    "
                />
                <FormError :errors="errors?.tags" />
            </FormGroup>

            <div class="flex mt-6">
                <div>
                    <Link :href="$routes.get('documents.index')" class="btn btn-muted mr-5"
                        >Cancel</Link
                    >
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, inject } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'
import { Inertia } from '@inertiajs/inertia'

import { RoutesModule } from '@/plugins/routes/props'
import DocumentModel from '@/models/Document'
import TagModel from '@/models/Tag'
import ErrorsModel from '@/models/extras/Error'
import FormGroup from '@/components/forms/FormGroup2.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import Dropdown from '@/components/forms/DropdownMultiple.vue'
import Input from '@/components/forms/Input.vue'
import FormLabel from '@/components/forms/FormLabel.vue'
import FormError from '@/components/forms/FormError.vue'

export default defineComponent({
    props: {
        document: {
            type: Object as PropType<DocumentModel>,
            required: true,
        },
        tags: {
            type: Object as PropType<TagModel[]>,
            required: true,
        },
        errors: {
            type: Object as PropType<ErrorsModel>,
            required: false,
        },
    },
    components: { Link, FormGroup, ErrorMessage, Document, Dropdown, Input, FormLabel, FormError },
    setup({ document }) {
        // refs
        const $routes = inject<RoutesModule>('$routes')
        const form = reactive({
            name: document.name,
            tags: document.tags!.map((tag) => tag.name),
        })

        // methods
        const submit = () => {
            Inertia.put($routes?.get('documents.update', { id: document.slug }) || '', form)
        }

        // return
        return { form, submit }
    },
})
</script>
